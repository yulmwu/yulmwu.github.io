---
title: Hash 트레잇, Hasher, DefaultHasher
description: Hash trait, Hasher and DefaultHasher
author: ky0422
date: 2022-10-05 21:12:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "해싱", "Hash", "Hasher", "DefaultHasher"]
_tistory: https://ky0422.tistory.com/17
---

## 개요

러스트 표준 라이브러리엔 해싱을 지원하는 모듈이 존재합니다. (`std::hash`)

말 그대로 해싱을 지원하며, 구조체에 `Hash` 트레잇을 사용할 수 있습니다:

```rust
use std::{collections::hash_map::*, hash::*};

#[derive(Hash, Debug)]
struct Foo(usize);

fn hash<T: Hash>(t: &T) -> u64 {
    let mut hasher = DefaultHasher::new();
    t.hash(&mut hasher);
    hasher.finish()
}

fn main() {
    let foo = Foo(30);
    println!("{:?}", hash(&foo));

    let bar = Foo(30);
    println!("{:?}", hash(&bar));
}
```

위 코드는 똑같은 `u64` 크기의 값을 출력합니다. 누가봐도 `Hash`의 모습이지만, 코드를 이해하는 것도 중요합니다.

먼저 위 코드는 다음과같이 작성할 수 있습니다:

```rust
// 생략

#[derive(Debug)]
struct Foo(usize);

impl Hash for Foo {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.0.hash(state);
    }
}

// 생략
```

`#[derive(Hash)]` 는 내부적으로 위와 같이 구현됩니다. `Hasher`는 또 뭘까요?

## Hasher

말 그대로 해시하기 위한 트레잇입니다. 이 트레잇에는 `write_*`, `finish` 등의 메서드가 존재합니다.

실제로 위 코드에서 `finish`가 호출된것을 볼 수 있습니다. `Hasher`는 다음과 같이 작동합니다.

1.  `DefaultHasher` 등으로 `Hasher`를 만듭니다.
2.  `write`, `write_*` (`write_u8`, `write_str` 등)을 호출하여 `Hasher`에 데이터를 씁니다.
3.  finish로 마무리하여, 여태 썼던 해시를 반환합니다.

`DefaultHasher`는 `RandomState`을 사용합니다. 이 글에선 다루지 않으니, 궁금하다면 [문서](https://doc.rust-lang.org/std/collections/hash_map/struct.RandomState.html)를 참조하면 됩니다.

위에선 `write` 대신 `hash` 함수를 사용했는데, 이는 `Hash` 트레잇에 내장되어있습니다.

`hash` 함수는 값을 해시하여, 가변 `Hasher` 참조에 `write` 합니다.  
`Hash` 트레잇은 대부분의 기본 타입 (`str`, `char`, `u8`, `bool` 등)에 구현되어 있습니다.

만약 `sha256` 등의 다른 `Hasher`를 사용하고 싶다면, 다른 개발자가 만든 크레이트를 사용하면 됩니다.
