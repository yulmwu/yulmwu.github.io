---
title: "&'static T와 T: 'static의 차이점"
description: "Difference between reference with static lifetime and trait bound with static lifetime."
author: ky0422
date: 2022-12-08 18:07:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "static", "정적 수명"]
_tistory: https://ky0422.tistory.com/25
---

## 개요

특히 러스트 초보(= 입문자)분들이 흔히들 오해를 하는데, 이 둘은 생긴것만 비슷하게 생겼고, 동작은 다릅니다.

`&'static T`는 참조의 정적 수명입니다. 이 글을 방문했다는건 정적 수명에 대해 대부분 알고있을거라 생각합니다.

이름이 비슷한 `T: 'static`은 트레잇 바운드입니다.

이것은 `T`가 정적 라이프타임을 가지고 있지 않으면, 제한하는 트레잇 바운드입니다.

```rust
fn foo<T: 'static>(_x: T) {}

static X: i32 = 5;

fn main() {
    let x: &'static str = "Hello, World!";
    foo(x);
    foo(X);

    let y = 5;
    foo(&y); // error
}
```

이 코드에서 `x`와 `X`는 `'static` 수명을 가지기 때문에, 아무런 문제가 없었습니다.

반면 `y`의 참조는 `'static` 수명을 가지고 있지 않기 때문에, 오류가 발생합니다.

## 요약

`&'static T`와 `T: 'static`은 다르며, 전자는 정적 수명을 가짐을 명시, 후자는 정적 수명을 가지고 있지 않으면 그것을 제한하는 트레잇 바운드입니다.
