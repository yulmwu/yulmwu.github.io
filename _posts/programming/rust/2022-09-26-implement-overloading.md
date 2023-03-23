---
title: 간편한 함수 오버로딩 구현하기
description: Implementing function overloading using structs and traits.
author: ky0422
date: 2022-09-26 20:38:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "함수 오버로딩", "function overloading", "구현"]
_tistory: https://ky0422.tistory.com/2
---

## 개요

유감스럽게도 러스트엔 함수 오버로딩(`overloading`), `default parameter`, `optional parameter` 등이 없습니다.  
하지만 구조체를 사용하여, 오버로딩의 흉내는 낼 수 있습니다.

```rust
struct Overloading;

trait Foo<T> {
    type Output;
    fn ctor(arg: T) -> Self::Output;
}
```

이렇게 선언된 구조체와 트레잇을 이용하여 함수 오버로딩을 사용할 수 있습니다:

```rust
impl Foo<usize> for Overloading {
    type Output = usize;

    fn ctor(arg: usize) -> Self::Output {
        arg * 10
    }
}

impl Foo<String> for Overloading {
    type Output = String;

    fn ctor(arg: String) -> Self::Output {
        arg + "!"
    }
}
```

> `ctor`은 `constructor`를 의미합니다. 이 예제에선 `ctor` 라는 네이밍을 사용했습니다.

이런 식으로 제네릭 `T`엔 인자 타입, 연관 타입(associated type) `Output`을 구현하여, 오버로딩을 흉내 낼 수 있습니다.  
이제 헬퍼(Helper) 함수를 이용해서 편리하게 호출할 수 있습니다:

```rust
#[inline]
fn foo<T>(arg: T) -> <Overloading as Foo<T>>::Output
where
    Overloading: Foo<T>,
{
    <Overloading as Foo<T>>::ctor(arg)
}

fn main() {
    println!("{}", foo(2));
    println!("{}", foo(String::from("Hello")));
}
```

번외로, 여기서 `#[inline]` 속성이 사용되었습니다. 이에 대한 글은 [이곳](https://ky0422.tistory.com/24)을 참고해봅시다.

다만 복수 개의 인자를 받을 수는 없습니다. 그럴땐 튜플을 사용하거나 매크로를 사용해봅시다:

```rust
impl Foo<(usize, usize)> for Overloading {
    type Output = usize;

    fn ctor(arg: (usize, usize)) -> Self::Output {
        arg.0 + arg.1
    }
}

println!("{}", foo((2, 3)));
```

```rust
macro_rules! foo {
    ($arg:expr) => {
        $arg * 10
    };
    ($a:expr, $b:expr) => {
        $a + $b
    };
}

assert_eq!(foo!(2), foo!(15, 5));
```
