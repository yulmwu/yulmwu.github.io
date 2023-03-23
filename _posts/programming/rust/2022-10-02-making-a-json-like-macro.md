---
title: Any 트레잇을 사용해서 JSON 비스무리한 매크로 만들기
description: Making a JSON-like macro using the Any trait.
author: ky0422
date: 2022-10-02 19:54:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "Any", "HashMap", "json", "매크로"]
_tistory: https://ky0422.tistory.com/13
---

## 개요

> Any 트레잇에 대한 글은 [이곳](../any-and-typeid)을 참고해봅시다.

```rust
HashMap::from([(1, 2), (3, 4)]);
```

`from` 함수를 사용해서(또는 `.into()`) `HashMap`을 생성할 수 있었습니다.

해시 맵이 아닌 `json` (`JavaScript Object Notation`) 값을 다루려면 [`serde-rs/json`](https://github.com/serde-rs/json) 등으로 `json` 값을 다룰 수 있습니다.

필자는 단순한 코드를 원하고, 크레이트를 사용하기 원하지 않았습니다.

{% raw %}

```rust
macro_rules! json {
    ($($key:expr => $value:expr),*) => {{
        use std::collections::*;

        let mut map: HashMap<&str, _> = HashMap::new();
        $(
            map.insert($key, $value);
        )*

        map
    }};
}
```

{% endraw %}

`key: value` 으로 작성했으면 좋겠지만, 파서의 한계로 `=>` 를 사용하였습니다.

> 만약 serde-rs/json 같은 크레이트와 같은 매크로를 선언하고 싶다면, [절차적 매크로를 사용해봅시다.](https://ky0422.tistory.com/20)

이 매크로는 다음과 같이 사용할 수 있습니다:

```rust
json! {
    "a" => "foo",
    "b" => "bar",
    "c" => "baz"
};
```

사실 `json`이 아닌 `HashMap`이긴 합니다.  
그런데 이것은 **심각한** 문제가 있습니다: 매크로에서 `value` 타입을 `&str`로 단정 짓는 바람에 다른 타입을 쓸 수 없었습니다:

```rust
json! {
    "a" => "foo",
    "b" => "bar",
    "c" => 3 // mismatched types
};
```

## Any

이러면 의미가 없으니, 필자는 **`Any`** 트레잇을 사용해보았습니다.  
`Any` 트레잇은 모든 타입을 받을 수 있습니다. `Any` 트레잇은 `TypeId`와 같이 자주 사용되지만, 이 글에선 다루지 않습니다.  
좀 복잡해질 수 도 있기 때문에 `json 모듈`을 따로 구현해두었습니다.

{% raw %}

```rust
pub mod json {
    #[macro_export]
    macro_rules! json {
        ($($key:expr => $value:expr),*) => {{
            use std::{any::*, collections::*};

            let mut map: HashMap<&str, Box<dyn Any>> = HashMap::new();
            $(
                map.insert($key, Box::new($value));
            )*
            map
        }};
    }
}

let json = json! {
    "a" => 1,
    "b" => "qwerty",
    "c" => json! {
        "d" => [1, 2, 3]
    }
};
```

{% endraw %}

이제 드디어 모든 타입을 받을 수 있게 되었습니다.

`Any` 트레잇은 컴파일 시간에 크기를 알 수 없기 때문에, `Box<T>`를 사용하였습니다.  
이제 `downcast_ref` 또는 `downcast_mut`으로 값에 접근할 수 있습니다:

```rust
if let Some(v) = json["b"].downcast_ref::<&str>() {
    assert_eq!(*v, "qwerty");
}
```

## 값 가져오기

그런데 누가 `json` 값을 가져오는데 `downcast_...`같은 복잡한 함수를 쓸까요? 그런건 아무도 안씁니다.  
때문에 `get` 헬퍼 함수 및 가변 `downcast` 헬퍼 함수 `get_mut`을 구현해보았습니다.

{% raw %}

```rust
pub mod json {
    use std::any::*;

    pub struct JsonValue<T: Any + ?Sized>(pub T);

    impl JsonValue<dyn Any> {
        pub fn get<T: Any>(&self) -> Option<&T> {
            self.0.downcast_ref::<T>()
        }

        pub fn get_mut<T: Any>(&mut self) -> Option<&mut T> {
            self.0.downcast_mut::<T>()
        }
    }

    #[macro_export]
    macro_rules! json {
        ($($key:expr => $value:expr),*) => {{
            use std::{any::*, collections::*};

            let mut map: HashMap<&str, Box<JsonValue<dyn Any>>> = HashMap::new();
            $(
                map.insert($key, Box::new(JsonValue($value)));
            )*
            map
        }};
    }
}
```

{% endraw %}

`JsonValue` 구조체를 정의해주었습니다.  
제네릭 `T`는 `Any`를 바운드하였으며, 컴파일 타임에 알 수 없기 때문에 `?Sized`를 붙여주었습니다.

코드는 복잡해 보이지만, 한층 더 편리한 러스트 프로그래밍을 할 수 있습니다.

```rust
use json::*;

let json = json! {
    "a" => 1,
    "b" => "qwerty",
    "c" => json! {
        "d" => [1, 2, 3]
    }
};

if let Some(v) = json["b"].get::<&str>() {
    assert_eq!(*v, "qwerty");
};

if let Some(v) = json.get_mut("b") {
    if let Some(v) = v.get_mut::<&str>() {
        *v = "foo";

        assert_eq!(*v, "foo");
    }
};
```
