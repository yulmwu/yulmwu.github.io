---
title: 클로저(closure)는 항상 새로운 타입인가?
description: How Closures Work?
author: ky0422
date: 2022-09-26 21:08:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "클로저", "closure"]
_tistory: https://ky0422.tistory.com/3
---

## 개요

클로저를 다루다 보면 이런 식의 에러 메시지가 발생할 때가 있습니다:

```rust
...(...): [closure@src\...:n:n: x:xx]
```

보통 `integer`, `bool` 등의 타입 이름이 나오지만, 클로저는 위 형식과 같이 나옵니다.  
일단 이 상황은 잠시 미뤄둬봅시다:

```rust
let mut foo = vec![];
foo.push(|| 1);
foo.push(|| 2);
```

당연히 작동할 것 같은 코드입니다만, 하지만 이 코드는 빌드되지 않습니다.

```
mismatched types
expected closure `[closure@src\main.rs:4:14: 4:18]`
   found closure `[closure@src\main.rs:5:14: 5:18]`
no two closures, even if identical, have the same type
consider boxing your closure and/or using it as a trait object (rustc E0308)

main.rs(4, 14): the expected closure
main.rs(5, 9): arguments to this function are incorrect
mod.rs(1760, 12): associated function defined here
```

두 타입이 다르다는 오류가 우리를 반겨줍니다.  
`|| 1`과 `|| 2`는 분명 `fn() -> i32` 타입인데, 두 타입이 다르다니 참 아이러니한 상황일겁니다.

그에 대한 해답은, 클로저의 내부적인 구조를 보면 이해가 될겁니다.  
rustc는 내부적으로 클로저를 각각 따로 구현합니다. 필자가 내부 구조를 알진 못하니, 일단 그렇게 알아둬봅시다.  
실제로 클로저의 `size_of_val`은 `0` 입니다:

```rust
let x = || 1;
println!("{}", size_of_val(&x)); // 0

let y = 1;
println!("{}", size_of_val(&y)); // 4

let z = String::from("hello");
println!("{}", size_of_val(&z)); // 24

struct MyStruct;
println!("{}", size_of_val(&MyStruct)); // 0
```

이 문제는 `dyn`으로 명시해서 해결해봅시다:

```rust
let x: &dyn Fn() -> i32 = &|| 1;
println!("{}", size_of_val(&x)); // 16
```

```rust
let mut foo: Vec<&dyn Fn() -> i32> = vec![];
foo.push(&|| 1);
foo.push(&|| 2);
```

참고로 `dyn` (`dynamic`) 트레잇은 `Sized`가 아닌 타입(`?Sized`)입니다.  
쉽게 말해, 컴파일 시간에 크기가 정해져 있지 않은 타입을 말합니다.
