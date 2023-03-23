---
title: 절차적 매크로, syn, quote, Attribute 만들기
description: Procedural Macro, syn, quote and Attribute
author: ky0422
date: 2022-10-08 22:23:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "절차적 매크로", "매크로"]
_tistory: https://ky0422.tistory.com/20
---

## 개요

# 절차적 매크로, syn, quote, Attribute

절차적 매크로는 함수(`procedure`)처럼 생겼다고 해서 절차적 매크로(`procedural macro`)입니다.

`#[foo(bar = 10)]` 등의 모습은 속성이며, 이는 Attribute (속성) 문법입니다. 여기서 만들 절차적 매크로는 `#[derive(Foo)]` 등의 `Derive` 속성입니다.

일반적인 매크로와의 차이점이라 하면, 일반적인 매크로는 패턴에 맞게 대치하는 반면, 절차적 매크로는 코드를 추가합니다.

절차적 매크로를 만들기위해, `proc-macro` (절차적 매크로) 크레이트를 생성해줍니다.

> 왜 따로 절차적 매크로 크레이트를 분리해야 하냐는 질문이 분명 있을 겁니다:
>
> 절차적 매크로 크레이트는 일반적인 크레이트처럼 생겼지만, 컴파일 시 문법 (AST 등)를 수정한다는 점에서, 일반적인 크레이트 보단 컴파일러 플러그인 정도에 가깝습니다.
>
> 이에 대해 한 가지 더 재밌는 사실을 알 수 있는데, 절차적 매크로 크레이트는, 빌드 시 절차적 매크로가 아닌 크레이트들과 연결되지 않습니다. 때문에, 굳이 타겟 아키텍처에 맞게 빌드할 필요는 없습니다.

오늘의 예제 프로젝트 구조는 다음과 같습니다.  
(예제를 무시하고 절차적 매크로 선언만 보고 싶다면, 무시해도 괜찮습니다.):

- `/foo` 크레이트
  - \`\`/src\`
    - `main.rs`
  - `Cargo.toml`
- `/foo_derive` (절차적 매크로 크레이트)
  - `/src`
    - `lib.rs`
  - `Cargo.toml`

먼저 아래의 명령어를 입력하여, 크레이트를 생성해줍니다.:

```
$ cargo new foo --bin
$ cargo new foo_derive --lib
```

`foo` 크레이트의 `Cargo.toml`에서 `foo_derive` 의존성을 추가해주어야 합니다:

```toml
[dependencies]
foo_derive = { path = "../foo_derive" }
```

또한, 절차적 매크로는 `proc-macro`를 따로 추가해주어야 합니다. `foo_derive` 크레이트의 `Cargo.toml`:

```toml
# 생략

[lib]
proc-macro = true
```

`rust analyzer` 등을 사용한다면, `foo_derive` 크레이트에서 오류가 발생할 것입니다. 이는 매우 정상적이며, 절차적 매크로 크레이트에선 절차적 매크로만 선언되어야 합니다.

## syn과 quote

그리고 몇 가지의 크레이트가 더 필요한데, `syn` 크레이트와 `quote` 크레이트가 필요합니다. 각각의 크레이트가 하는 일은 다음과 같습니다:

- [`syn`](https://docs.rs/syn/latest/syn/): `TokenStream`을 분석합니다. 또한, 우리가 러스트 코드에서 사용할 수 있는 AST 관련 데이터 등을 제공합니다.
- [`quote`](https://docs.rs/quote/latest/quote/): 러스트 코드를 받아, `TokenStream`으로 반환합니다.

각 크레이트에 대해 자세히 알고 싶다면, 각 크레이트의 문서를 참고하길 바랍니다.

필자는 현재의 최신 버전인 `syn 1.0.102`, `quote 1.0.21`를 사용합니다:

```toml
[dependencies]
quote = "1.0.21"
syn = "1.0.102"
```

이제 준비는 끝났습니다. 절차적 매크로 선언은 다음과 같습니다:

```rust
use proc_macro::TokenStream;

#[proc_macro_derive(FooMacro)]
pub fn foo_macro(input: TokenStream) -> TokenStream {
    input
}
```

이 아직 코드는 무의미합니다. 이제 아까 추가해두었던 `syn`과 `quote`를 사용해봅시다.  
우리가 만들 절차적 매크로는, `FooMacro`를 호출하면 `Person` 트레잇을 구현해주는 절차적 매크로입니다.

`foo` 크레이트의 `main.rs`:

```rust
use foo_derive::FooMacro;

trait Person {
    fn say_hello(&self);
}

#[derive(FooMacro)]
struct A {
    name: String,
}

fn main() {
    let a = A {
        name: "John".to_string(),
    };
    a.say_hello();
}
```

이제 `syn`과 `quote` 크레이트가 필요합니다. `syn`의 `parse_macro_input` 매크로를 이용해서, `TokenStream`을 분석합니다:

`foo_derive` 크레이트의 `lib.rs`:

```rust
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(FooMacro)]
pub fn foo_macro(input: TokenStream) -> TokenStream {
    let DeriveInput { ident, .. } = parse_macro_input!(input as DeriveInput);

    let result = quote! {
        impl Person for #ident {
            fn say_hello(&self) {
                println!("Hello, my name is {}", self.name);
            }
        }
    };

    result.into()
}
```

여기서 `DeriveInput` 구조체는 다음과 같은 필드가 존재합니다:

- `attrs`: `#[foo]` 같은 속성을 뜻합니다.
- `vis`: `pub`, `pub(crate)` 같은 가시성을 뜻합니다.
- `ident`: 그 아이템의 `identifier` (식별자)를 뜻합니다.
- `generics`: 제네릭 또는 `where` 절을 뜻합니다.
- `data:` 구조체의 경우 필드 등을 뜻합니다. (`struct`, `enum`, `union`)

여기서 우리가 사용한 것은 `ident` 입니다.

그리고 우리는 `quote` 크레이트를 사용하여, `quote` 매크로를 호출했습니다.

만약 `quote` 크레이트 없었다면, 우리는 직접 AST를 하나하나 구현했어야 했을 겁니다.  
다행히 `quote! {}` 매크로는 `TokenStream`을 반환하므로, `into`를 호출하여 반환한다.

이제 `foo` 크레이트를 실행하면, 성공적으로 `"Hello, my name is John"` 이 출력되었을 것입니다.  
예상했겠지만, `Debug`, `Default` 등의 매크로도 위와 같은 원리입니다. (물론 이들은 `built-in`이긴 합니다만)

실제로 `Debug`의 예시로, 아래의 둘 모두 똑같이 작동합니다:

```rust
#[derive(Debug)]
struct Foo {
    bar: usize
}
```

만약, `Debug` 매크로가 없었다면, 우리는 아래와 같이 일일이 구현해주었어야 할 것입니다:

```rust
struct Foo {
    bar: usize,
}

impl std::fmt::Debug for Foo {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("Foo").field("bar", &self.bar).finish()
    }
}
```

아까 우리는 `DeriveInput`에서 `attrs`가 존재하는 것을 확인했습니다.

속성(`attrs`)을 손수 만들어보고 싶은데, `syn`만 이용해선 힘들 겁니다.
이제, `darling` 크레이트를 사용해봅시다.

## darling

그리 유명한 크레이트는 아니나, `darling` 크레이트는 속성을 쉽게 파싱 할 수 있는 유용한 크레이트입니다.

필자는 가장 최신 버전인 `0.14.1`을 사용했습니다:

```rust
[dependencies]
darling = "0.14.1"
quote = "1.0.21"
syn = "1.0.102"
```

`darling` 크레이트는 `FromDeriveInput` 절차적 매크로와, 그에 따른 `darling` 속성을 이용하여, `attrs`를 파싱 할 수 있습니다:

```rust
use darling::FromDeriveInput;
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[derive(FromDeriveInput, Default)]
#[darling(default, attributes(nickname))]
struct Attributes {
    nickname: Option<String>,
}

#[proc_macro_derive(FooMacro, attributes(nickname))]
pub fn foo_macro(input: TokenStream) -> TokenStream {
    let input = parse_macro_input!(input as DeriveInput);
    let attrs = Attributes::from_derive_input(&input).unwrap();

    let DeriveInput { ident, .. } = input;

    let my_name = match attrs.nickname {
        Some(nickname) => quote! {
            fn say_hello(&self) {
                println!("Hello, my name is {}, but you can call me {}.", self.name, #nickname);
            }
        },
        None => quote! {
            fn say_hello(&self) {
                println!("Hello, my name is {}.", self.name);
            }
        },
    };

    let result = quote! {
        impl Person for #ident {
            #my_name
        }
    };

    result.into()
}
```

코드가 좀 복잡해졌습니다. 하지만 수정하기 전의 코드에서 조금의 코드만 추가되었을 뿐입니다.

`FromDeriveInput`를 사용했다면, `proc_macro_derive` 속성에도 `attributes`를 추가하여 이런 하위 속성이 있다고 명시해주어야 합니다.

그런데 만약 `Attributes`에서 `Option<T>`를 사용하지 않으면 어떻게 될까요?

눈치가 빠른 독자라면 `Default` 트레잇이 적용되었기 때문에, 빈 문자열이 반환됩니다. 이것을 방지하기 위해, `Option<T>`를 사용했습니다. 생각하지 못했다고 실망하진 맙시다.

이제 다음과 같은 코드가 가능해졌습니다:

```rust
use foo_derive::FooMacro;

trait Person {
    fn say_hello(&self);
}

#[derive(FooMacro)]
struct A {
    name: String,
}

#[derive(FooMacro)]
#[nickname(nickname = "Bob")]
struct B {
    name: String,
}

fn main() {
    let a = A {
        name: "John".to_string(),
    };
    a.say_hello();

    let b = B {
        name: "John".to_string(),
    };
    b.say_hello();
}
```
