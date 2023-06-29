---
title: RwLock, 그리고 Mutex의 차이점
description: RwLock and Mutex, the difference.
author: ky0422
date: 2022-09-30 22:34:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "RwLock", "Mutex"]
_tistory: https://ky0422.tistory.com/10
---

## 개요

한번쯤 들어본 `RwLock`은 `Mutex`(상호 배제)와 비슷해 보입니다. `RwLock`는 `Reader-Writer Lock`의 줄임말입니다.

![Rust Memory](/imgs/2022-09-30-rwlock-and-mutex-the-difference/rust-mem.png)
_(출처: [rust-memory-container-cs](https://github.com/usagi/rust-memory-container-cs))_

위 자료에서 볼 수 있듯이 `Mutex`는 `Reader` / `Writer`이며, `RwLock`은 **`Readers`** / `Writer` 입니다.  
`Mutex`는 동기화이며, `RwLock`은 그렇지 않습니다. 여기서 `Lock`의 의미는 다음과 같습니다:

- `Write Lock`: `Writer`가 쓰기를 마칠 때까지 `Reader`가 읽을 수 없습니다.
- `Read Lock`: `Reader`가 읽을 때 까지 `Writer`가 값을 수정할 수 없습니다.

`Mutex`는 `lock`을 호출하는 시점에서 자신의 차례가 올 때까지 기다립니다.  
(`unlock`, `lock` 함수가 반환하는 `MutexGuard`가 `Drop` 되면 자동으로 `unlock` 됩니다.)

또 한가지가 더 있습니다.

`RwLock<T>`는 `Mutex<T>`에 비해 `T`가 `thread-safe`를 위해 구현해야 할 트레잇 바운드가 더 많습니다:

- **`Mutex`:** `T: Send`
- **`RwLock`:** `T: Send + Sync`

즉, 동기화를 위한 API는 `Mutex`가 유일합니다.  
`Mutex`와 `RwLock`의 API를 보면 차이점이 이해될 수 있습니다:

- `Mutex`에서 값을 `Write`/`Read` (이하 `R/W`) 하려면 `lock`을 호출하여 `MutexGuard` 스마트 포인터를 얻습니다.  
  이를 역참조하여, 값을 `R/W` 할 수 있습니다.
  - `MutexGuard`는 `Deref`가 구현되어 있으니 스마트 포인터입니다. (이런 구조를 `RAII` 패턴이라 칭합니다.)  
    즉, 정확히는 `Mutex`가 스마트 포인터가 아닌 `MutexGuard`가 스마트 포인터입니다.
- `RwLock`은 `write()`와 `read()`를 통해 각각 `RwLockWriteGuard`와 `RwLockReadGuard`를 얻습니다.  
  이 둘도 위와 같이 스마트 포인터 이며, 이들도 역참조를 통해 값을 `R/W` 할 수 있습니다.

> 물론 `lock()`, `write()`, `read()`를 호출하면 `Result<T, E>`를 반환합니다. 이해를 돕기 위해 이는 생략하였습니다.

아래의 예제를 보며, `Mutex`와 `RwLock`이 어떻게 작동하는지 확인해봅시다:

```rust
use std::{
    sync::{Arc, Mutex},
    thread,
    time::Duration,
};

fn main() {
    let x = Arc::new(Mutex::new(0));

    let t1 = thread::spawn({
        let x = Arc::clone(&x);

        move || {
            let mut x = x.lock().unwrap();
            *x += 1;

            println!("t1 (write): {}", *x);

            thread::sleep(Duration::from_secs(1));
        }
    });

    let t2 = thread::spawn({
        let x = Arc::clone(&x);

        move || {
            let x = x.lock().unwrap();
            println!("t2: {}", *x);

            thread::sleep(Duration::from_secs(1));
        }
    });

    let t3 = thread::spawn({
        let x = Arc::clone(&x);

        move || {
            let x = x.lock().unwrap();
            println!("t3: {}", *x);

            thread::sleep(Duration::from_secs(1));
        }
    });

    t1.join().unwrap();
    t2.join().unwrap();
    t3.join().unwrap();
}
```

이 예제는 `Mutex`를 사용하는 예제입니다.

실행해보면 `t1`이 출력되며, 1초를 기다린 후 `t2`, 또다시 1초를 기다린 후 `t3`가 출력되었습니다  
이는 `Mutex`가 동기화라는 것을 알 수 있습니다. `R/W`를 하나 밖에 하지 않기 때문에 `lock`을 호출하여 `MutexGuard` 스마트 포인터를 가져온 후, 역참조 하여 값을 수정하고 읽었습니다.

## RwLock

조금만 수정하여 `RwLock`을 사용하는 예제를 작성해봅시다:

```rust
use std::{
    sync::{Arc, RwLock},
    thread,
    time::Duration,
};

fn main() {
    let x = Arc::new(RwLock::new(0));

    let t1 = thread::spawn({
        let x = Arc::clone(&x);

        move || {
            let mut x = x.write().unwrap();
            *x += 1;

            println!("t1 (write): {}", *x);

            thread::sleep(Duration::from_secs(1));
        }
    });

    let t2 = thread::spawn({
        let x = Arc::clone(&x);

        move || {
            let x = x.read().unwrap();
            println!("t2: {}", *x);

            thread::sleep(Duration::from_secs(1));
        }
    });

    let t3 = thread::spawn({
        let x = Arc::clone(&x);

        move || {
            let x = x.read().unwrap();
            println!("t3: {}", *x);

            thread::sleep(Duration::from_secs(1));
        }
    });

    t1.join().unwrap();
    t2.join().unwrap();
    t3.join().unwrap();
}
```

이 예제를 실행해보면 `t1`이 출력된 후, 1초 뒤에 동시에 `t2`, `t3` (이 둘의 순서는 상관없습니다. 동시에 출력되었기 때문이죠.)이 출력되었습니다.  
그리고 1초 후 프로그램이 종료되었습니다. 이렇듯 `RwLock`은 동기화되지 않습니다.  
실제로 같은 코드 내에서 `Mutex`의 `lock`을 동시에 실행하면, 데드락(`deadlock`)이 발생합니다:

```rust
use std::sync::{Arc, Mutex};

fn main() {
    let x = Arc::new(Mutex::new(0));

    {
        let x1 = x.lock().unwrap();
        let x2 = x.lock().unwrap();
    }
}
```

이 예제는 영원히 끝나지 않습니다.  
하지만 예제를 `RwLock`을 사용하는 방법으로 변경하면, 프로그램이 정상적으로 끝나는 것을 확인할 수 있습니다:

```rust
use std::sync::{Arc, RwLock};

fn main() {
    let x = Arc::new(RwLock::new(0));

    {
        let x1 = x.read().unwrap();
        let x2 = x.read().unwrap();
    }
}
```
