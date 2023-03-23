---
title: Default 트레잇
description: Default trait
author: ky0422
date: 2022-09-29 17:38:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "Default", "Default 트레잇"]
_tistory: https://ky0422.tistory.com/9
---

## 개요

`Default`로 구조체, 열거형 타입 등에서 기본 값을 가져올 수 있습니다:

```rust
let (a, b, c, d): (usize, bool, String, Vec<i32>) = Default::default();

assert_eq!(a, 0);
assert_eq!(b, false);
assert_eq!(c, "");
assert_eq!(d, vec![]);
```

`Default` 트레잇을 구현하면 됩니다:

```rust
#[derive(Debug)]
struct Foo {
    x: i32,
    y: i32,
}

impl Default for Foo {
    fn default() -> Self {
        Foo { x: 0, y: 0 }
    }
}

fn main() {
    let foo = Foo::default();
    let foo: Foo = Default::default();

    assert_eq!(foo.x, 0);
    assert_eq!(foo.y, 0);
}
```

이렇게 구현된 `Default`는 `..`을 사용하여, 구현하지 않은 필드를 기본 값으로 채워줄 수 있습니다:

```rust
Foo { x: 1, ..Foo::default() };
Foo { x: 1, ..Default::default() };
```

`<Default를 구현한 타입>::default()`, `Default::default()` 모두 같은 역할입니다.  
타입 추론이 불가능한 경우, `Default::default()`의 경우엔 위 코드처럼 타입 어노테이션을 붙여줘야합니다.

## 열거형에서의 Default

열거형(`enum`)의 경우엔 `Default` 트레잇 구현 없이 `#[default]` 속성(`attributes`)을 사용해 기본 값을 지정할 수 있습니다:

```rust
#[derive(Default, Debug)]
enum Foo {
    A,
    #[default]
    B,
}

fn main() {
    println!("{:?}", Foo::default());
}
```

단, `#[default]` 속성은 빈 아이템만 취급합니다.
