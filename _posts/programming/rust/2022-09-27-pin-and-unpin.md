---
title: Pin과 Unpin
description: Pin and Unpin
author: ky0422
date: 2022-09-27 22:48:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "Pin", "Unpin"]
_tistory: https://ky0422.tistory.com/7
---

## 개요

`Pin`은 `Pin<T>`에서 (`T`는 포인터) `T`가 가리키는 내용이 `Unpin`을 구현하지 않는 한 `T`가 이동되지 않도록 보장하는 스마트 포인터입니다.

`T`는 이동(`move`)할 수 있는 포인터만 유효합니다. 만약 `T`가 `Unpin`을 구현하고 있다면, `Pin`이 비활성화 됩니다.  
대부분 `Unpin`은 자동으로 구현됩니다. 물론 `PhantomPinned` 같은 경우엔 예외입니다.  
`Pin`을 설명하기 전에, 이동에 대해 잠시 보도록 합시다:

```rust
fn main() {
    let s = String::from("hello");
    let s1 = s; // 이 시점에서 s는 유효하지 않습니다.
    println!("{}", s1);
}
```

이동(`move`)은 우리와 너무나도 친숙한 존재일겁니다.

이동은 러스트를 배우지 않았다면 불편한 존재지만, 러스트를 배우고 다시 보면 러스트의 자랑스러운 기능 중 하나 일 것입니다.  
하지만 이런 이동이 일어나지 않아야 할 상황이 있습니다. 바로 **자기 참조 구조(`self reference structure`)**입니다:

```rust
use std::ptr;

struct Foo {
    foo: usize,
    bar: *mut usize,
}

impl Foo {
    pub fn new(foo: usize) -> Foo {
        Foo { foo, bar: ptr::null_mut() }
    }

    pub fn init(&mut self) {
        self.bar = &mut self.foo;
    }

    pub unsafe fn get_mut(&self) -> &mut usize {
        &mut *self.bar
    }
}

fn main() {
    let mut foo = Foo::new(1);
    foo.init();

    let foo_mut = unsafe { foo.get_mut() };

    *foo_mut = 5;
    println!("{}", foo_mut);
}
```

보통 이런 모습을 자기 참조 구조라 부릅니다.  
위 코드에서 `get_mut()`은 `foo`의 참조가 아닌 `bar`에 저장해둔 참조를 반환합니다.  
이 코드는 잘 작동하지만, 조금만 수정해봅시다:

```rust
// 생략

fn foo() -> Foo {
    let mut foo = Foo::new(1);
    foo.init();
    foo
}

fn main() {
    let f = foo();

    let foo_mut = unsafe { f.get_mut() };

    *foo_mut = 5;
    println!("{}", foo_mut);
}
```

이걸 실행해보면 이상한 값이 나오는데, `bar`가 `foo` 함수에서의 스택을 가리키고 있기 때문에, Undefined Behavior (UB) 가 발생합니다. 이미 해제된 메모리를 역참조하였기 때문이죠.

예를 들어, 어떤 객체가 `0x0001`에 위치해있고, 그 객체를 가리키는 포인터가 있다고 가정합시다.  
만약 그 객체가 재배치 되어, 임의의 위치 `0x0002`로 이동하였다면 상당히 곤란하겠죠.  
이 문제의 해결 방법은 이동해도 변하지 않는 주소일 때만 참조를 저장해야 합니다.

`Pin`은 그 문제를 해결해줍니다:

## Pin

```rust
use std::{marker::*, pin::*, ptr};

struct Foo {
    foo: usize,
    bar: *mut usize,
    _pin: PhantomPinned,
}

impl Foo {
    pub fn new(foo: usize) -> Foo {
        Foo { foo, bar: ptr::null_mut(), _pin: PhantomPinned }
    }

    pub fn init(self: Pin<&mut Self>) {
        unsafe {
            let this = self.get_unchecked_mut();
            this.bar = &mut this.foo;
        }
    }

    pub fn get_foo_mut(self: Pin<&mut Self>) -> Option<&mut usize> {
        if self.bar.is_null() {
            None
        } else {
            unsafe { Some(&mut *self.bar) }
        }
    }
}

fn foo() -> Pin<Box<Foo>> {
    let foo = Foo::new(1);
    let mut foo = Box::pin(foo);

    foo.as_mut().init();
    foo
}

fn main() {
    let mut f = foo();

    let foo_mut = f.as_mut().get_foo_mut();

    if let Some(foo_mut) = foo_mut {
        *foo_mut = 5;

        println!("{}", *foo_mut);
    }
}
```

여기에서 `Foo` 구조체의 `_pin` 필드가 왜 존재하는지 의문일 수 있습니다.

`marker` 타입 `PhantomPinned`를 사용하여 `Foo`를 `!Unpin`으로 만들어줍니다.  
(`Send` 처럼 `!Send`를 구현할 수 있도록 하는 기능은 아직 지원하지 않습니다.)

`Box<T>` 또한 `Unpin`이기 때문에, `Pin<Box<T>>`으로 래핑 하였습니다.  
`Pin`을 사용한 타입들은 항상 고정된 주소를 가지게 되었고, `bar`도 `Pin`을 사용하여 초기화 되었습니다.  
그렇기에 `Pin<Box<Foo>>`를 `Pin<&mut Foo>` (`as_mut`)로 만드는 건 안전합니다.

추가적으로 `Pin<T>`을 사용할 때 조건이 있습니다:

- `T`가 `Unpin`이면, `T`는 `Pin`에 의해 소멸될 때까지 `T`를 `Unpin` 상태로 유지해야 합니다.
- `T`가 `!Unpin`이면, `T`는 `Pin`에 의해 소멸될 때까지 고정됩니다.

`Unpin`을 구현하면 `Pin`이 `&mut T`를 안전한 러스트에서 허용해주며, 그렇지 않으면 안전한 러스트에서 고정할 수 있습니다. (즉 `&mut T`를 얻을 수 없음).

때문에 아래의 코드는 작동하지 않습니다:

```rust
use std::{mem::*, pin::*};

fn swap_data<T>(x: Pin<&mut T>, y: Pin<&mut T>) {
    swap(&mut *x, &mut *y); // <- cannot borrow data in dereference of `std::pin::Pin<&mut T>` as mutable
}

fn main() {
    let mut x = 5;
    let mut y = 10;
    let x = Pin::new(&mut x);
    let y = Pin::new(&mut y);

    swap_data(x, y);
}
```

그럼 이런걸 어디에 쓸까요? 이는 `Future`에서 사용하는데 (사실상 여기서만 사용), `Future`은 이 글에서 자세히 다루진 않으나, 비동기에서 사용하는 중요한 개념입니다.
