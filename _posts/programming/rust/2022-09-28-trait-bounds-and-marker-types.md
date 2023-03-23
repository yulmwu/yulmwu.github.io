---
title: ?Trait 바운드와 marker 타입
description: ?Trait bounds and marker types
author: ky0422
date: 2022-09-28 20:53:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "Trait", "트레잇", "marker types"]
_tistory: https://ky0422.tistory.com/8
---

## 개요

`?` (물음표) 트레잇 바운드는 트레잇이 선택 사항임을 표시하는 문법입니다.

```rust
trait X {}

struct A;
impl X for A {}
struct B;

fn foo<T>(_x: T)
where
    T: ?X {}

fn main() {
    foo(A);
    foo(B);
}
```

만약 `T: ?X`가 아닌, `T: X` 였다면, 오류가 발생했을 것입니다:

```rust
the trait bound `B: X` is not satisfied
the trait `X` is implemented for `A`
```

보통 `?Sized`등의 `marker 타입`으로 `?` 트레잇 바운드를 사용해보았을 겁니다:

```rust
fn foo<T>(x: &T)
where
    T: ?Sized + std::fmt::Debug,
{
    println!("{x:?}");
}

fn main() {
    let x = 42;
    foo(&x);
}
```

`Sized`는 컴파일 타임에 알려진 크기의 타입을 나타냅니다.

예를 들어 `[usize; 3]`은 크기가 `3`이라는 알려진 타입입니다.  
하지만 `[usize]`는 컴파일 타입에 길이가 얼만지 모릅니다.

> 보통 `str` 이나 `[T]` 등의 알려지지 않은 크기의 타입을 `DST`(`Dynamically Sized Type`)이라고 부릅니다.

이럴 때 `?Sized`를 사용하여 컴파일 타임에 알려지지 않은 크기의 타입을 취급할 수 있습니다:

```rust
struct Foo<T>(T)
where
    T: ?Sized + std::fmt::Debug;

struct FooBar(Foo<[usize]>);
```

## marker 타입

`marker 타입`은 정말 간단하게 말해서, 어떤 타입의 속성을 나타내는 구조체, 트레잇 등의 빈 타입입니다.  
러스트의 타입은 고유한 속성에 따라, 다양한 방식으로 분류됩니다.

그러한 속성을 표시(명시)해주는 타입입니다.  
위에서 언급한 `Sized`도 `marker` 타입이며, 구조체로 이루어진 `PhantomData`, `PhantomPinned`, 트레잇으로 이루어진 `Copy`, `Send`, `Sync`, `Sized`, `Unpin`도 `marker 타입`입니다. (자세한 사항은 [여기](https://doc.rust-lang.org/std/marker/index.html)에서 확인할 수 있습니다.)

위 `?` 트레잇 바운드와 반대로, 부정 트레잇 바운드도 존재합니다: `!` (느낌표)  
이가 대표적으로 사용되는 예는 `Rc<T>` 입니다.

`Rc<T>`에서는 `Send`와 `Sync`을 구현하면 안 됩니다. (자칫하다간 데이터 레이스가 발생할 수 있기 때문에)
때문에 `Rc<T>`의 구현을 보면

```rust
impl<T> !Send for Rc<T> where T: ?Sized { /* ... */ }
impl<T> !Sync for Rc<T> where T: ?Sized { /* ... */ }
```

처럼 구현된 것을 볼 수 있습니다. 반면 `Arc`의 구현을 보면 `Send`와 `Sync`이 구현되어 있는 것을 확인할 수 있습니다:

```rust
impl<T> Send for Arc<T>
where
    T: Sync + Send + ?Sized { /* ... */ }

impl<T> Sync for Arc<T>
where
    T: Sync + Send + ?Sized { /* ... */ }
```
