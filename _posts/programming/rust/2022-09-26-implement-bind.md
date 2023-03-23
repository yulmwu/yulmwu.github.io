---
title: 모나드 bind 함수 구현하기
description: Implementing the monadic bind function.
author: ky0422
date: 2022-09-26 21:31:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "모나드", "Monad", "bind", "구현"]
_tistory: https://ky0422.tistory.com/4
---

## 개요

이 글에선 모나드의 강력한 기능중 하나인 `bind` (하스켈에선 `>>=` 연산자) 를 구현해보고자 합니다.

```rust
pub trait Monad {
    type T;
    type U;

    fn bind<F>(self, f: F) -> Self::U
    where
        F: FnOnce(Self::T) -> Self::U;
}
```

`type T`는 `bind`의 인자가 받는 함수(`f`)의 인자이며, `type U`는 `bind`와 `f`의 반환값입니다.  
이렇게만 말하면 뭔말인지 이해가 힘드니, 직접 구현해보며 이해해봅시다:

```rust
impl<T> Monad for Option<T> {
    type T = T;
    type U = Option<T>;

    fn bind<F>(self, f: F) -> Self::U
    where
        F: FnOnce(Self::T) -> Self::U,
    {
        match self {
            Some(x) => f(x),
            None => None,
        }
    }
}
```

`Option<T>`에 대한 `Monad` 구현입니다. `bind` 함수를 봅시다.  
만약 `self` (`Option<T>`)가 `Some<T>` 이면, 함수 `f`를 실행하며, 아니라면 그냥 `None`을 반환합니다.

이제 한층 더 편한 러스트 프로그래밍을 할 수 있습니다:

```rust
assert_eq!(Some(10).bind(|x| Some(x * 10)), Some(100));
assert_eq!(None::<usize>.bind(|x| Some(x * 10)), None);

let (mul_5, div_10) = (|x: usize| Some(x * 5), |x: usize| Some(x / 10));

assert_eq!(Some(10).bind(mul_5).bind(div_10), Some(5));
```
