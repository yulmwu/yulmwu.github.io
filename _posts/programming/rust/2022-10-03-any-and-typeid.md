---
title: Any 트레잇과 TypeId
description: Any trait and TypeId
author: ky0422
date: 2022-10-03 15:19:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "Any", "TypeId"]
_tistory: https://ky0422.tistory.com/15
---

## 개요

`Any` 트레잇은 모든 `'static` 타입의 동적 타이핑을 가능케 하는 트레잇입니다.  
`'static`은 수명 `'static`과 트레잇 바운드 `'static`이 존재합니다. 자세한 내용은 [이 글](https://ky0422.tistory.com/25)을 참고해봅시다.  
여기서 서술하는 `'static`은 트레잇 바운드 `'static`을 의미합니다.

`Any` 타입을 사용하는 예제:

```rust
use std::any::Any;

let x: Box<dyn Any> = Box::new(1);
let y: &dyn Any = &1;
```

`Any`는 컴파일 타임에 크기를 알 수 없습니다. 때문에 `dyn` 접두사를 사용하며, `Box` 또는 `'static` 참조를 사용합니다.  
`Any` 타입을 사용하는 다른 예제:

```rust
use std::{any::Any, fmt::Display};

fn foo<T: Any + Display>(x: &T) {
    match (x as &dyn Any).downcast_ref::<i32>() {
        Some(v) => println!("i32: {v}"),
        None => println!("unknown: {x}"),
    }
}

foo(&1);
foo(&"hello");
```

여기서 `downcast_ref`를 사용하였습니다.

`downcast_mut` 등의 여러 API가 존재하는데, 각자 하는 역할은 다음과 같습니다:

- `downcast<T>`: 이는 `Box<...>`에 대해 구현되어 있습니다. `Box`를 `downcast` 하며, `Result<T, E>`를 반환합니다.
- `downcast_ref<T>`: `dyn Any` + `'static`에 구현되어 있습니다. 내부 값이 `T` 타입과 일치한다면, 그것에 대해 참조를 반환합니다. `Option<T>`를 반환하며, 일치하지 않다면 `None`을 반환합니다.
- `downcast_mut<T>`: 위 `downcast_ref`와 동일하며, 가변 참조를 반환합니다.

이밖에도 `is` 함수 등이 구현되어 있지만, 이 글에선 서술하지 않습니다. 자세한 내용은 [이곳](https://doc.rust-lang.org/std/any/trait.Any.html)을 참고해봅시다.

## TypeId

`TypeId`는 타입에 대해 고유한 식별자를 나타냅니다. 위에서 서술하진 않았지만, 타입을 비교하는 `is` 함수는 다음과 같이 정의되어 있습니다:

```rust
pub fn is<T: Any>(&self) -> bool {
    let t = TypeId::of::<T>();

    let concrete = self.type_id();

    t == concrete
}
```

대충 보면 `is`의 사용 방법을 알 것입니다. 하지만 `is`의 사용 방법을 서술하진 않았으니, `TypeId` 부분을 봅시다.  
`Any` 트레잇은 `TypeId`를 반환하는 `type_id`라고 하는 함수를 구현하고 있습니다.

위는 `TypeId::of::<T>()`를 사용하여, 두 `TypeId`가 일치하는지 검사하는 함수입니다.  
사실상 `TypeId`의 주요 기능은 이게 전부입니다.

이밖에도 `Provider`와 `Demand`가 존재하지만 깊이 들어가는 기능이기도 하고, 무엇보다 실험적 기능이므로 이 글에선 서술하지 않습니다.  
혹시라도 궁금하다면 [이곳](https://doc.rust-lang.org/nightly/std/any/index.html#provider-and-demand)을 참고해봅시다.
