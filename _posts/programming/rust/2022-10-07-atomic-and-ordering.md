---
title: atomic 타입과 Ordering 열거형
description: atomic type and Ordering enum
author: ky0422
date: 2022-10-07 17:14:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "atomic", "Ordering"]
_tistory: https://ky0422.tistory.com/19
---

## 개요

램(RAM)은 생각보다 느립니다. 물리적으로 봐도 CPU와 램은 떨어져있죠.
이들이 데이터를 주고받느라(사이클) 꽤 많은 사이클을 소비합니다.

CPU는 어떠한 연산을 1번만에 처리하는 반면, 램과 데이터를 주고받느라 여러 사이클을 돌려야 하기 때문입니다.
그럼 어떻게 해야할까요?: 램을 CPU에 박아 넣으면 됩니다. (물리적으로)

CPU 마다 다르겠지만, CPU의 구조는 대충 이렇게 생겼습니다:

- `MC (Memory Controller)`: 램과 소통하는 역할입니다. 여기서 램 슬롯 등을 제어합니다.
- `Core`: CPU의 그 코어가 맞습니다.
- `Cache`: 우리가 찾던 CPU에 박혀있는 램입니다. (물리적으로 `Core` 보다 더 큰 사이즈를 가지고 있습니다.) (`L1`, `L2`, `L3` 등)
- ... 그리고 `misc` (`minimal instruction set computers`), `qpi` (`quick path interconnect`) 등이 있습니다. 우리가 알아야할 것은 아닙니다.

`Cache` (캐시) 부분을 봅시다: `L1`은 `8~64KB` 정도로 제한됩니다. `L2`와 `L3`는 이것보다 더 크며, `L3`는 `8MB` 정도 됩니다.
우리가 생각하는 `8GB` 정도의 램은 아닙니다. 그러니깐 이름이 캐시 메모리죠.

아무튼 캐시를 사용하면, 램의 사이클보다 더 적은 사이클로, 빠르게 처리할 수 있습니다.CPU가 특정 주소의 데이터에 접근하면, 먼저 캐시에서 찾습니다.
있으면 그 값을 읽고 (`cache hit`), 없으면 램에 접근합니다. (`cache miss`) 그리고, 그 값을 캐시에 저장합니다.

그런데 캐시는 상당히 제한되어있습니다: 당연하겠지만, CPU는 자주 접근하는 주소를 모르기 때문에, 그냥 무식하게 다 찼으면 CPU 마다 다른 방식으로 처리합니다.

여기서 등장하는 다른 용어가 있습니다: CPU 파이프라이닝 (`pipelining`)입니다. 매우 간단하게 설명하자면, 병렬 처리를 위해 존재합니다. (자세한 내용은 블로그 `카테고리 > 컴퓨터 구조`를 참고하세요.)

예를 들어, 4단계의 어떤 사이클이 있다고 생각합시다. 한 사이클을 돌고 다른 사이클을 실행하는 것 보단, 동시에 실행하는 것이 효율적일 것입니다.

명령어의 처리 단계는 다음과 같습니다 (설명하는 곳마다 다를 수 있습니다만, 대부분 4단계를 거칩니다.):

1.  `fetch`: 명령어를 읽음
2.  `decode`: 명령어 해석
3.  `execute`: 명령어 실행
4.  `write`: 결과를 씀

파이프라인을 사용하며, 이러한 단계를 병렬로 처리할 수 있습니다:

예를들어, 아래와 같은 (유사)코드가 있다고 합시다:

```
A: memory[0] = 1
B: memory[1] = 2
```

| 명령어 | t1      | t2       | t3        | t4        | t5      |
| ------ | ------- | -------- | --------- | --------- | ------- |
| `A`    | `fetch` | `decode` | `execute` | `write`   |         |
| `B`    |         | `fetch`  | `decode`  | `execute` | `write` |

실행 단계가 겹치지만 않는다면, 위와 같이 처리하여 병렬로 처리할 수 있습니다.

그런데 문제가 발생했습니다. 다음과 같은 (유사)코드를 보겠습니다:

```
A: memory[0] = 1
B: memory[1] = 2
C: memory[2] = memory[0] + memory[1]
D: memory[3] = 3
```

C는 A와 B가 끝나야 실행할 수 있습니다. 때문에, 이럴 경우 파이프라인 해저드가 발생합니다. (자세한 내용은 컴퓨터 구조에서 다룹니다.)
하지만 D는 위 A, B, C와 관련이 없지만, 순차적으로 실행된다면 C가 끝나야 실행할 수 있습니다.

| 명령어 | t1      | t2       | t3        | t4        | t5      | t6      | t7       | t8        | t9        | t10     |
| ------ | ------- | -------- | --------- | --------- | ------- | ------- | -------- | --------- | --------- | ------- |
| `A`    | `fetch` | `decode` | `execute` | `write`   |         |         |          |           |           |         |
| `B`    |         | `fetch`  | `decode`  | `execute` | `write` |         |          |           |           |         |
| `C`    |         |          |           |           |         | `fetch` | `decode` | `execute` | `write`   |         |
| `D`    |         |          |           |           |         |         | `fetch`  | `decode`  | `execute` | `write` |

컴파일 시 효율성을 위해 명령어 재배치가 일어날 수 있습니다. 말 그대로, 명령어가 재배치가 되는 경우입니다.

위 파이프라인 해저드 예제를 아래와 같이 재배치 한다면 어떨까요?:

```
A: memory[0] = 1
B: memory[1] = 2
D: memory[3] = 3
C: memory[2] = memory[0] + memory[1]
```

| 명령어 | t1      | t2       | t3        | t4        | t5        | t6      | t7       | t8        | t9      |
| ------ | ------- | -------- | --------- | --------- | --------- | ------- | -------- | --------- | ------- |
| `A`    | `fetch` | `decode` | `execute` | `write`   |           |         |          |           |         |
| `B`    |         | `fetch`  | `decode`  | `execute` | `write`   |         |          |           |         |
| `D`    |         |          | `fetch`   | `decode`  | `execute` | `write` |          |           |         |
| `C`    |         |          |           |           |           | `fetch` | `decode` | `execute` | `write` |

이런 경우를 비순차적 명령어 실행(`out-of-order execution`)이라고 합니다.

그런데 이렇게 자기 마음대로 수정해버리면, 그것이 제대로 작동한다는 보장이 있을까요?
컴퓨터가 100% 정확하진 않기 때문에, 이를 보완하기 위해 수정 순서(`modification order`)가 존재합니다. 이는 어떤 값에 대한, 값의 변화를 기록합니다.

예를 들어, 변수 `foo`를 선언하고, 3개의 스레드 `A`, `B`, `C`를 동시에 실행합니다.

- `A 스레드`: `foo`에 `1`을 대입. 그리고 약간의 딜레이 후, `foo`에 `2`를 대입: 이때의 수정 순서는 `1 -> 2`가 됩니다.
- `B 스레드`: `foo`에 `3`을 대입. 그리고 `foo`를 `2`번 읽음: 이때의 수정 순서는 `3 -> 4 -> 2`가 됩니다.
- `C 스레드`: `foo`를 읽음. 그리고 `foo`에 `4`를 대입. 그리고 `foo`를 읽음: 이때의 수정 순서는 `1 -> 4 -> 2`가 됩니다.

좀 복잡하게 설명했지만, 우리가 볼 것은 다음과 같습니다:

만약 어떤 스레드가 `3`을 읽었다면, 다음엔 `3`, `4`, `2` 중 하나가 읽합니다. 위에서 서술하지 않는 내용이 있는데, 바로 캐시는 코어마다 가지고 있습니다. (ex, `Core 1`의 `L1`, `L2`, `L3`)

만약 캐시에서만 `3`을 기록하고 있다면, 다른 코어에선 그 값이 `3` 인 것을 보장할 수 없습니다.
즉, 동기화 작업은 시간을 많이 소비하는 작업입니다.

## atomic

서론이 좀 길었는데, 본론으로 돌아와 `atomic`에 대해 알아봅시다.

C++로 먼저 atomic에 대해 접해보았다면 러스트에서도 비슷하게 사용할 수 있습니다.

`atomic`은 원자적 연산 (한 번에 일어나는 명령어 연산) 입니다. 1개의 명령어 이므로, 처리했다와 안했다로만 존재합니다.
(어셈블리어 코드에 `lock` 접두어가 포함되게 되는데, `lock`은 CPU 명령어 실행 사이클을 한번에 처리합니다.)

`atomic`을 사용하는 예제:

```rust
use std::{
    sync::{atomic::*, *},
    time::*,
    *,
};

fn main() {
    let spinlock = Arc::new(AtomicUsize::new(1));

    let t = {
        let spinlock_clone = Arc::clone(&spinlock);

        thread::spawn(move || {
            while spinlock_clone.load(Ordering::Relaxed) == 1 {
                hint::spin_loop();

                thread::sleep(Duration::from_secs(2));

                spinlock_clone.store(3, Ordering::SeqCst);
            }
        })
    };

    while spinlock.load(Ordering::SeqCst) != 3 {
        hint::spin_loop();

        if spinlock.load(Ordering::SeqCst) == 3 {
            println!("{}", spinlock.load(Ordering::SeqCst));
        }
    }

    t.join().unwrap();
}
```

> Spin Lock은 다른 스레드가 어떤 리소스를 Lock 하고 있다면, 현재 스레드를 기다리고, 락이 풀리면 현재 스레드가 그 리소스에 접근하는 동기화 기법입니다. 자세한 내용은 이 글에서 다루지 않습니다.

## Ordering

위 코드에서 처음 보는 것들이 많이 등장했습니다: 바로 `Ordering` 열거형입니다.

- `Relaxed (store, load, modify)`: 가장 느슨한 조건입니다. 즉, 다른 메모리 접근들과 순서가 바뀌어도 무방합니다. 아무런 제약이 없으므로, CPU 마음대로 재배치가 가능합니다. (결과가 동일하다면)
- `Release (store, modify), Acquire (load, modify)`: `Relaxed`는 아무런 제약이 없어서, 사실상 `Atomic`을 쓸 이유가 없어집니다. `Release`와 `Acquire`는 그것보단 조금 더 엄격합니다: `Release`는 재배치를 금지합니다. `Acquire`로 읽는다면, `Release` 이전의 명령어들이 스레드에 의해 관찰될 수 있어야 합니다.
- `AcqRel (modify)`: `Acquire` + `Release`
- `SeqCst (store, load, modify)`: `SeqCst`는 순차적 일관성(`Sequential Consistency`)을 보장합니다. 쉽게 말해서 재배치도 없고 모든 스레드에서 동일한 값을 관찰할 수 있습니다. 대신 동기화 비용이 클 수 있습니다.

또한, `store`와 `load` 함수는 `atomic` 객체에 대해 쓰기 및 읽기를 가능케 하는 함수입니다. 이 함수의 인자에 `Ordering` 열거형이 전달됩니다.

---

그런데 우린 의문점이 하나 있습니다: ["왜 `Atomic`은 제네릭(`Atomic<T>`)을 사용하지 않는가?"](https://github.com/rust-lang/rfcs/pull/1505) 이겠죠.

C++에서도 클래스 템플릿을 사용하여, `atomic`을 제네릭으로 사용할 수 있습니다. (`atomic<T>`)

그 이유는 생각보다 간단한데, 예를 들어, `Atomic<[usize; 3]>` 같은 건 하드웨어가 지원하지 않습니다.

이것의 해결법은 [`atomic` 크레이트](https://github.com/Amanieu/atomic-rs)나 `Mutex<T>`를 사용하는 방법이 있습니다. 물론 둘 모두 `Atomic`의 작동 방식과는 다르긴 합니다.

`Atomic`은 하드웨어와 동시성 프로그래밍을 둘 다 이해하고 있어야 함으로, 상당히 어려운 개념에 속합니다.

이해하지 못했다면, 그냥 [`Mutex<T>`나 `RwLock<T>`](../rwlock-and-mutex-the-difference)을 쓰는것이 올바른 선택입니다.
