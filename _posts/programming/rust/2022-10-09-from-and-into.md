---
title: From, TryFrom 트레잇 (Feat. Into, TryInto)
description: From and TryFrom traits (Feat. Into and TryInto)
author: ky0422
date: 2022-10-09 22:25:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "From", "TryFrom"]
_tistory: https://ky0422.tistory.com/21
---

## 개요

`From` 트레잇을 사용하면, 다른 타입을 대상 타입으로 변환할 수 있습니다.

이미 많이 사용해왔던 기능인데, `String::from("foo")` 등으로 사용해왔던 트레잇입니다:

```rust
use std::convert::*;

#[derive(Debug, PartialEq)]
struct Foo {
    bar: usize,
}

impl From<usize> for Foo {
    fn from(item: usize) -> Self {
        Foo { bar: item }
    }
}

let x = Foo::from(5);
assert_eq!(x, Foo { bar: 5 });
```

하지만 `Box<T>`같은 타입은 `new` 메서드를 사용해서 `Box`를 생성할 수 있습니다. (물론 `From` 트레잇도 구현되어 있으나, 둘 모두 같은 기능을 합니다.)

그럼 왜 굳이 `From` 트레잇을 구현하는가 하면, 매우 간단명료하게 대답할 수 있습니다:

`Box`의 `new`와 `from`은 제네릭 `T`를 받고, `from`은 `new`를 호출합니다.  
(제네릭 `T`를 받지 않는 타입(ex, `String`) 같은 경우, `new` 보단 `from`이 더욱 편합니다.)

그러므로 `new`와 `from` 메서드의 기능은 똑같지만, 후술할 `Into` 덕분에 `from`이 존재합니다.

## Into

`Into`는 `From`을 구현하면 자동으로 구현됩니다. 다만, 사용 방법이 조금 다릅니다:

```rust
use std::convert::*;

#[derive(Debug, PartialEq)]
struct Foo {
    bar: usize,
}

impl From<usize> for Foo {
    fn from(item: usize) -> Self {
        Foo { bar: item }
    }
}

let x = Foo::from(5);
assert_eq!(x, Foo { bar: 5 });

let x: Foo = 5usize.into();
assert_eq!(x, Foo { bar: 5 });
```

`into`를 사용할 땐, 컴파일러가 어떤 타입인지 모르기 때문에, 타입 어노테이션을 명시해주어야 합니다.

## TryFrom, TryInto

관련 자료 등을 찾아보면 `TryFrom`과 `TryInto`가 존재하는 것을 알 수 있는데, 이들은 이름 그대로 반환되는 값이 `Result<T, E>`의 경우일 때 사용합니다.

대표적으로, 타입 변환을 사용할 때 이용됩니다:

```rust
let x: Result<i64, _> = 5i32.try_into();
```

타입으로 쓰인 `_`는 반환 값을 무시하는 `_ = expr;` 문법이 아닌, [`infer` 타입을 뜻합니다.](https://doc.rust-lang.org/reference/types/inferred.html)

`TryFrom` 또한, `From` 트레잇과 비슷하게 구현할 수 있습니다:

```rust
use std::convert::*;

#[derive(Debug, PartialEq)]
struct Foo {
    bar: usize,
}

impl TryFrom<usize> for Foo {
    type Error = &'static str;

    fn try_from(value: usize) -> Result<Self, Self::Error> {
        if value != 0 {
            Ok(Foo { bar: value })
        } else {
            Err("Error")
        }
    }
}

let x = Foo::try_from(5);
assert_eq!(x, Ok(Foo { bar: 5 }));

let x = Foo::try_from(0);
assert_eq!(x, Err("Error"));

let _: Foo = 5usize.try_into().unwrap();
```

다만 차이점은, `Error`라는 연관 타입(associated type)이 존재하는데, 그냥 `Result<T, E>`의 제네릭 `E` 입니다.
