---
title: "연결 리스트의 개념과 간단하게 직접 구현해보기"
description: "Linked List concept and implementing it."
author: ky0422
date: 2023-03-23 18:30:00 +0900
categories: ["프로그래밍", "Rust"]
tags: ["Rust", "러스트", "Linked List", "연결 리스트", "자료구조"]
---

## 개요

**연결 리스트**(Linked List)는 자료 구조의 일종입니다.
가장 많이 비교되는 배열(Array)과 비교를 해본다면, 연결 리스트는 **데이터**와 추가적으로 **포인터**를 가지고 있습니다.

이 포인터는 다음 데이터의 위치를 가리키고 있습니다.
리스트의 첫번째 **노드**(Node)는 **헤드**(Head)라고 부르며, 마지막 노드는 **테일**(Tail)이라고 부릅니다.
**노드**(Node)는 연결 리스트의 최소 단위입니다.

연결 리스트는 다음과 같이 표현할 수 있습니다:

```
HEAD                      TAIL
+---+---+    +---+---+    +---+---+
| 1 |  --->  | 2 |  --->  | 3 |  --->  NULL
+---+---+    +---+---+    +---+---+
```

일반적으로 배열은 정적으로 크기가 정해져있지만, 연결 리스트는 동적으로 작동하기 때문에, 배열보다 더 유연하며 크기를 미리 정해둘 필요도 없습니다.

왜 쓰냐는 것에 대한 가장 큰 이유는, 연결 리스트는 중간의 데이터를 추가하거나 삭제할 때, 배열보다 빠르게 작동하기 때문입니다.

## 시간 복잡도로 비교하기

### 데이터 인덱싱

연결 리스트는 순차 접근 방식이기 때문에, 어떠한 데이터를 찾기 위해선 처음부터 하나하나 찾아야 합니다. (`O(n)`)

그러나, 배열은 단순히 인덱스를 통해 바로 접근할 수 있기 때문에 (`O(1)`), 데이터 인덱싱이 중요한 경우엔 배열을 사용하는 것이 좋습니다.

### 데이터 추가

연결 리스트는 포인터의 값을 변경하기만 하면 되기 때문에, 데이터 추가 자체론 `O(1)`의 시간 복잡도를 가집니다.
하지만, 노드의 위치가 헤드가 아니라면, 데이터 인덱싱과 마찬가지로 처음부터 하나하나 찾아야 합니다. (`O(n)`)

배열은 데이터를 추가할 때, 기존 데이터를 뒤로 밀어야 하기 때문에, 데이터 추가 자체는 `O(n)`의 시간 복잡도를 가집니다.
물론 맨 뒤에 데이터를 추가할 경우, `O(1)`의 시간 복잡도를 가집니다.

### 데이터 삭제

연결 리스트는 삭제하려는 데이터가 헤드라면, 헤드를 다음 노드로 변경하면 되기 때문에, `O(1)`의 시간 복잡도를 가집니다.
하지만, 노드의 위치가 헤드가 아니라면, 데이터 인덱싱과 마찬가지로 처음부터 하나하나 찾아야 합니다. (`O(n)`)

배열은 데이터를 삭제할 때, 기존 데이터를 앞으로 당겨야 하기 때문에, 데이터 삭제 자체는 `O(n)`의 시간 복잡도를 가집니다.
물론 맨 뒤에 데이터를 삭제할 경우, `O(1)`의 시간 복잡도를 가집니다.

---

이러한 이유로, 연결 리스트와 배열을 언제 사용할지는 상황에 따라 다릅니다.

**데이터의 접근이 중요하다면 배열을 사용하고, 데이터의 추가/삭제가 중요하다면 연결 리스트를 사용하는 것이 좋습니다.**

또한 앞서 말했듯이, 연결 리스트는 동적으로 작동하기 때문에, 메모리를 더 많이 사용합니다.

## 단일 연결 리스트 (Single Linked List)

위에서 설명한 구조 모두 **단일 연결 리스트**입니다. 앞서 설명했지만, 각 노드는 데이터와 포인터를 포함하고 있고, 포인터는 다음 노드의 위치를 가리킵니다.

마지막 노드(테일)의 포인터는 아무것도 가리키지 않습니다. (`NULL`)

## 이중 연결 리스트 (Double Linked List)

**이중 연결 리스트**는 단일 연결 리스트와 다르게, 각 노드는 데이터와 두 개의 포인터를 포함하고 있습니다.

하나는 다음 노드의 위치를 가리키고, 다른 하나는 이전 노드의 위치를 가리킵니다.

## 원형 연결 리스트 (Circular Linked List)

**원형 연결 리스트**는 단일 연결 리스트의 마지막 노드(테일)에 헤드를 가리키는 포인터를 추가한 것입니다.

즉, 마지막 노드가 가리키는 포인터는 `NULL`이 아닌, 헤드를 가리키게 됩니다.

## 구현하기

이 구현에선 간단하게 단일 연결 리스트를 구현하며, 이 코드는 실제로 사용하기엔 여러 부분에 문제가 있으니, 참고용으로만 사용하길 바랍니다. (기본으로 제공되는 `std::collections::LinkedList`가 존재합니다.)

### 노드 구현와 LinkedList 구조체 구현

먼저 노드를 구현해주겠습니다:

```rust
pub struct Node<T> {
    data: T,
    next: Option<Box<Node<T>>>,
}

pub struct LinkedList<T> {
    head: Node<T>,
    length: usize,
}
```

`data`는 데이터를 저장하는 곳이며, `next`는 다음 노드의 위치를 가리키는 포인터입니다.
여기선 이해를 돕기 위해 위와 같이 구현했지만, 실제론 다를 수 있습니다.

만약 `next`가 `None`이라면, 마지막 노드(테일)입니다.

`LinkedList`는 헤드와 길이를 가지고 있습니다.

### append

`append`는 맨 앞에 데이터를 추가하는 함수입니다:

```rust
use std::mem::replace;

impl<T> Node<T> {
    pub fn append(&mut self, data: T) {
        let node_data = replace(&mut self.data, data); // self.data를 data로 바꾸고, 이전 값을 node_data에 저장
        self.next = Some(Box::new(Node { // self.next에 기존의 데이터를 저장
            data: node_data,
            next: self.next.take(),
        }));
    }
}
```

`2 -> 3 -> NULL`라는 연결 리스트가 있다고 가정하고, `append(1)`을 호출하면, `1 -> 2 -> 3 -> NULL`이 됩니다.

> 앞으로 나올 3개의 함수는 `impl ...`을 생략합니다. 전체 코드는 아래에서 확인할 수 있습니다.
{: .prompt-info }

### append_last

`append_last`는 맨 뒤에 데이터를 추가하는 함수입니다:

```rust
pub fn append_last(&mut self, data: T) {
    if let Some(node) = &mut self.next { // self.next가 Some이면 (테일이 아니면)
        node.append_last(data); // append_last를 재귀적으로 호출
    } else { // self.next가 None이면 (테일이면)
        self.next = Some(Box::new(Node { data, next: None })); // self.next에 새로운 노드를 추가
    }
}
```

`2 -> 3 -> NULL`라는 연결 리스트가 있다고 가정하고, `append_last(4)`을 호출하면, `2 -> 3 -> 4 -> NULL`이 됩니다.

### remove

`remove`는 맨 앞에 데이터를 삭제하는 함수입니다:

```rust
pub fn remove(&mut self) {
    if let Some(node) = self.next.take() { // self.next를 next에 저장하고, self.next를 None으로 바꿈
        self.data = node.data; // self.data에 next.data를 저장
        self.next = node.next; // self.next에 next.next를 저장
    }
}
```

`1 -> 2 -> 3 -> NULL`라는 연결 리스트가 있다고 가정하고, `remove()`를 호출하면, `2 -> 3 -> NULL`이 됩니다.

### remove_last

`remove_last`는 맨 뒤에 데이터를 삭제하는 함수입니다:

```rust
pub fn remove_last(&mut self) {
    if let Some(node) = &mut self.next { // self.next가 Some이면 (테일이 아니면)
        if node.next.is_none() { // next.next가 None이면 (next가 테일이면)
            self.next = None; // self.next를 None으로 바꿈
        } else {
            node.remove_last(); // remove_last를 재귀적으로 호출
        }
    }
}
```

`1 -> 2 -> 3 -> NULL`라는 연결 리스트가 있다고 가정하고, `remove_last()`를 호출하면, `1 -> 2 -> NULL`이 됩니다.

### 그 외 함수

`append`, `append_last`, `remove`, `remove_last` 이외에도, `get`, `get_last`, `len`, `is_empty` 등의 함수를 구현할 수 있습니다만, 이 글에서는 다루지 않겠습니다.

그리고 `LinkedList`의 함수를 구현할 수 있습니다:

```rust
impl<T> LinkedList<T> {
    #[inline]
    pub fn new(data: T) -> Self {
        LinkedList {
            head: Node { data, next: None },
            length: 1,
        }
    }

    /// Append a new node to the head of the list:
    ///
    /// `1 -> 2 -> 3 -> NULL`
    ///
    /// append 4
    ///
    /// `4 -> 1 -> 2 -> 3 -> NULL`
    #[inline]
    pub fn append(&mut self, data: T) {
        self.head.append(data);
        self.length += 1;
    }

    /// Append a new node to the end of the list:
    ///
    /// `1 -> 2 -> 3 -> NULL`
    ///
    /// append_last 4
    ///
    /// `1 -> 2 -> 3 -> 4 -> NULL`
    #[inline]
    pub fn append_last(&mut self, data: T) {
        self.head.append_last(data);
        self.length += 1;
    }

    /// Remove the first node of the list:
    ///
    /// `1 -> 2 -> 3 -> NULL`
    ///
    /// remove
    ///
    /// `2 -> 3 -> NULL`
    #[inline]
    pub fn remove(&mut self) {
        self.head.remove();
        self.length -= 1;
    }

    /// Remove the last node of the list:
    ///
    /// `1 -> 2 -> 3 -> NULL`
    ///
    /// remove_last
    ///
    /// `1 -> 2 -> NULL`
    #[inline]
    pub fn remove_last(&mut self) {
        self.head.remove_last();
        self.length -= 1;
    }
}
```

그리고, 시각적 표현을 위해 `Display`를 구현하였습니다:

```rust
use std::fmt;

impl<T> fmt::Display for Node<T>
where
    T: fmt::Display,
{
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let next = match &self.next {
            Some(next) => next,
            None => return write!(f, "{}", self.data),
        };
        write!(f, "{} -> {}", self.data, next)
    }
}

impl<T> fmt::Display for LinkedList<T>
where
    T: fmt::Display,
{
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{} -> NULL", self.head)
    }
}
```

## 전체 코드

```rust
use std::{fmt, mem::replace};

pub struct Node<T> {
    data: T,
    next: Option<Box<Node<T>>>,
}

impl<T> Node<T> {
    pub fn append(&mut self, data: T) {
        let node_data = replace(&mut self.data, data);
        self.next = Some(Box::new(Node {
            data: node_data,
            next: self.next.take(),
        }));
    }

    pub fn append_last(&mut self, data: T) {
        if let Some(node) = &mut self.next {
            node.append_last(data);
        } else {
            self.next = Some(Box::new(Node { data, next: None }));
        }
    }

    pub fn remove(&mut self) {
        if let Some(node) = self.next.take() {
            self.data = node.data;
            self.next = node.next;
        }
    }

    pub fn remove_last(&mut self) {
        if let Some(node) = &mut self.next {
            if node.next.is_none() {
                self.next = None;
            } else {
                node.remove_last();
            }
        }
    }
}

pub struct LinkedList<T> {
    head: Node<T>,
    length: usize,
}

impl<T> LinkedList<T> {
    #[inline]
    pub fn new(data: T) -> Self {
        LinkedList {
            head: Node { data, next: None },
            length: 1,
        }
    }

    /// Append a new node to the head of the list:
    ///
    /// `1 -> 2 -> 3 -> NULL`
    ///
    /// append 4
    ///
    /// `4 -> 1 -> 2 -> 3 -> NULL`
    #[inline]
    pub fn append(&mut self, data: T) {
        self.head.append(data);
        self.length += 1;
    }

    /// Append a new node to the end of the list:
    ///
    /// `1 -> 2 -> 3 -> NULL`
    ///
    /// append_last 4
    ///
    /// `1 -> 2 -> 3 -> 4 -> NULL`
    #[inline]
    pub fn append_last(&mut self, data: T) {
        self.head.append_last(data);
        self.length += 1;
    }

    /// Remove the first node of the list:
    ///
    /// `1 -> 2 -> 3 -> NULL`
    ///
    /// remove
    ///
    /// `2 -> 3 -> NULL`
    #[inline]
    pub fn remove(&mut self) {
        self.head.remove();
        self.length -= 1;
    }

    /// Remove the last node of the list:
    ///
    /// `1 -> 2 -> 3 -> NULL`
    ///
    /// remove_last
    ///
    /// `1 -> 2 -> NULL`
    #[inline]
    pub fn remove_last(&mut self) {
        self.head.remove_last();
        self.length -= 1;
    }
}

impl<T> fmt::Display for Node<T>
where
    T: fmt::Display,
{
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let next = match &self.next {
            Some(next) => next,
            None => return write!(f, "{}", self.data),
        };
        write!(f, "{} -> {}", self.data, next)
    }
}

impl<T> fmt::Display for LinkedList<T>
where
    T: fmt::Display,
{
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{} -> NULL", self.head)
    }
}

fn main() {
    let mut list = LinkedList::new(2);
    list.append_last(3);
    list.append_last(4);
    list.append_last(5);
    list.append(1);
    println!("{list}"); // 1 -> 2 -> 3 -> 4 -> 5 -> NULL

    list.remove_last();
    println!("{list}"); // 1 -> 2 -> 3 -> 4 -> NULL

    list.remove();
    println!("{list}"); // 2 -> 3 -> 4 -> NULL
}
```

[이곳](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=61565684776d45f55664bb8a58b02665)을 클릭하여, Rust Playground에서 실행할 수 있습니다.
