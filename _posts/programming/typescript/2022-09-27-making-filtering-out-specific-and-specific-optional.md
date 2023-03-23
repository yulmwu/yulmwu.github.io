---
title: 객체 특정 타입만 걸러내기, 특정 요소 선택적 요소로 만들기
description: Making filtering out specific types from an object, and specific elements optional.
author: ky0422
date: 2022-09-27 19:35:00 +0900
categories: ["프로그래밍", "TypeScript"]
tags: ["TypeScript", "타입스크립트"]
_tistory: https://ky0422.tistory.com/6
---

## 개요

`Pick` 유틸리티 타입(`utility type`)이 타입스크립트에 내장되어있긴 합니다.

하지만 이 유틸리티 [타입은 이름을 유니온 타입으로 전달하면, 그 요소만 포함된 객체 타입을 반환합니다.](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)

간혹 이름이 아닌, 제공된 타입에 포함되는 요소를 반환하고 싶을 때도 있습니다:

```ts
type Filter<T, U> = Pick<
  T,
  { [K in keyof T]: T[K] extends U ? K : never }[keyof T]
>;
```

제네릭 `T`는 객체를 받으며, `U`는 타입의 유니온을 받습니다:

```ts
{ [K in keyof T]: T[K] extends U ? K : never }
```

위 코드는 `keyof T`를 순회하며, 제공된 타입과 요소의 타입이 같은지 확인합니다.
(같다면 원래의 `U`를 반환, 아니라면 `never`)

그리고 `[keyof T]`를 이용하여, `never` 타입을 걸러냅니다.

그 요소를 `Pick` 하기만 하면 끝나는 타입 레벨(`Type Level`) 코드입니다.

---

`Partial` 유틸리티 타입은 모든 요소를 선택적 요소로 만듭니다.

그런데 특정 요소만 선택적 요소로 만드는 유틸리티 타입은 없습니다.

```ts
type OptionalHelper<A> = {
  [K in keyof A]: A[K];
};

type Optional<T, U extends keyof T> = OptionalHelper<
  Omit<T, U> & { [K in U]?: T[K] }
>;
```

이제 생겼습니다.

`OptionalHelper`는 교차 타입(`intersection types`)을 일반적인 객체로 만들어줍니다.

코드만 보고 아무 기능을 안한다고 생각한다면 오산(誤算).

`U`는 `T`의 키(요소의 이름)만 받을 수 있습니다.
`Omit<T, U>`를 통해 전달받은 키들만 제외 시켜줍니다.

그런 다음, `{ [K in U]?: T[K] }`를 통해 전달받은 키들을 선택적 요소로 바꿔줍니다.
그리고 교차 타입으로 연결 시킨 뒤, 만들어뒀던 `OptionalHelper`를 통해 일반적인 개체 타입으로 만들어주면 됩니다.

```ts
type Filter<T, U> = Pick<
  T,
  { [K in keyof T]: T[K] extends U ? K : never }[keyof T]
>;

type OptionalHelper<A> = {
  [K in keyof A]: A[K];
};

type Optional<T, U extends keyof T> = OptionalHelper<
  Omit<T, U> & { [K in U]?: T[K] }
>;

interface Abcd extends Record<"a" | "b", string> {
  c: number;
  d: Array<boolean>;
}

type filter = Filter<Abcd, number | Array<boolean>>;
//   ^ { c: number, d: Array<boolean> }

type optional = Optional<{ a: string; b: number; c: boolean }, "a" | "c">;
//   ^ { b: number; a?: string | undefined; c?: boolean | undefined; }
```

이것들을 개조/참고해서 더 멋진 유틸리티 타입을 만들어봅시다.

이러한 타입 레벨을 사용해서 [사칙연산까지 가능합니다. (!!)](https://github.com/ky0422/type)
