---
title: constant (상수)와 const fn
description: const keyword, const fn, and miri
author: ky0422
date: 2022-09-27 18:22:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "상수", "constant", "const fn", "miri"]
_tistory: https://ky0422.tistory.com/5
---

## 개요

러스트엔 `const` 키워드가 있습니다. 이름 그대로 상수 선언 키워드며, 얼핏 보면 `static item` 키워드와 비슷해 보입니다.  
주제는 `const`이기 때문에 `static`의 간단한 설명과 차이점만 보고 넘어갑시다:

```rust
static STATIC: &str = "Hello, World!";
const CONSTANT: &str = "Hello, World!";
```

둘 모두 `&'static str` 타입을 가지는 전역 범위에서 사용할 수 있는 상수입니다.

- `static`: 수명이 있으며, 가변(`mut`)이 가능한 변수 (이 경우 `unsafe` 코드로 값을 변경할 수 있습니다.)
- `const`: 변경 불가능. (어떤 일이 있어도 변경할 수 없는 값입니다.)

`const fn`는 `const` 상수처럼 `constant context`의 일부입니다. (`const impl` 등도 이에 포함됩니다.)

이들의 특징은 컴파일 타임 상수 평가자(`constant evaluation`)가 컴파일 타임에 표현식을 계산합니다.  
또한 이들은 `for` 반복문 등을 허용하지 않습니다. (후술하겠지만, 사실 `for` 문 그 자체가 문제는 아닙니다.)  
그런데 `while`이나 `loop` 반복문은 사용할 수 있습니다. 이는 `Iterator`의 `next` 함수 때문입니다.

`for` 반복문은 `Iterator`의 `next`를 호출하여 순회합니다:

```rust
struct Range(/* start */ usize, /* end */ usize);

impl Iterator for Range {
    type Item = usize;

    fn next(&mut self) -> Option<Self::Item> {
        println!("calling next()");

        if self.0 < self.1 {
            let result = self.0;
            self.0 += 1;
            Some(result)
        } else {
            None
        }
    }
}

fn main() {
    for i in Range(0, 10) {
        println!("{i}");
    }
}
```

하지만 `const fn` 내부에선 `const fn`이 아닌 함수를 실행할 수 없습니다. (`next`는 `const fn`이 아닙니다.)
그렇기에 `for` 반복문을 사용할 수 없는 것이죠. 때문에 아래의 코드는 작동하지 않습니다:

```rust
const fn foo() -> i32 {
    let mut x = 0;
    loop { // work
        if x == 10 {
            break;
        }
        x += 1;
    }
    x
}

const fn bar() -> i32 {
    for x in 0..10 { // <- `for` is not allowed in a `const fn` ...
        if x == 10 {
            break;
        }
    }
}

const FOO: i32 = foo();
const BAR: i32 = bar();

fn main() {
    println!("{}", FOO);
    println!("{}", BAR);
}
```

## miri

추가로, 러스트의 `constant context`는 [`miri`](https://github.com/rust-lang/miri)라는 컴파일러 내장되어있는 인터프리터가 평가합니다.

`miri`는 `Undefined Behavior` (`UB`) 가 일어나면 컴파일 에러를 띄워주기도 합니다.

평가가 완료되면 바이러니에 바이트채로 저장되어, `static` 등에 저장됩니다.  
C++를 해보셨다면, `const fn`은 C++의 `constexpr`과 상당히 흡사하다는 걸 알 수 있습니다.
