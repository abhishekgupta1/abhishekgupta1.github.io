---
title: "Python: The Complete Guide"
description: "End-to-end reference for Python — core language, data structures, OOP, concurrency, decorators/generators, error handling, testing, and interview-ready Q&A."
sidebar_position: 1
tags: [python, sde, programming-language]
---

# Python — The Complete Guide

A single-read, end-to-end reference for Python: enough to onboard onto a new
codebase, write idiomatic production code, or walk into an SDE interview.
Organized as a lookup you can also read top-to-bottom.

---

## 1. What Python Is, in Practical Terms

Python is a **dynamically typed, interpreted, garbage-collected,
multi-paradigm** language (procedural, object-oriented, functional). The
reference implementation is **CPython**; alternatives include PyPy (JIT,
faster for long-running pure-Python workloads), Jython (JVM), and IronPython
(.NET).

Key design philosophy — "The Zen of Python" (`import this`): readability
counts, explicit is better than implicit, there should be one obvious way to
do it. This shows up everywhere in idiomatic code style.

---

## 2. Core Data Types

| Type | Mutable? | Ordered? | Notes |
|---|---|---|---|
| `int`, `float`, `complex` | — | — | `int` has arbitrary precision (no overflow) |
| `bool` | — | — | Subclass of `int` (`True == 1`) |
| `str` | No (immutable) | Yes | Unicode by default |
| `bytes` / `bytearray` | No / Yes | Yes | Raw binary data |
| `list` | Yes | Yes | General-purpose dynamic array |
| `tuple` | No | Yes | Immutable sequence; hashable if contents are |
| `dict` | Yes | Insertion-ordered (3.7+) | Hash map |
| `set` / `frozenset` | Yes / No | No | Hash-based uniqueness, O(1) membership |
| `NoneType` | — | — | Python's null — singleton `None` |

### Mutability gotcha (classic interview trap)

```python
def append_item(item, target=[]):   # BUG: default arg evaluated ONCE at def time
    target.append(item)
    return target

append_item(1)  # [1]
append_item(2)  # [1, 2]  <-- surprise! same list reused across calls
```

**Fix:** use `None` as the sentinel default and create the mutable object
inside the function body.

```python
def append_item(item, target=None):
    if target is None:
        target = []
    target.append(item)
    return target
```

### `is` vs `==`

`==` compares value equality; `is` compares object identity (same memory
location). Always use `is` for `None`/`True`/`False` checks
(`if x is None:`), and `==` for value comparison. Small integers (-5 to 256)
and short strings are cached/interned by CPython, so `is` can *appear* to
work on them — never rely on that.

---

## 3. Data Structures & Comprehensions

```python
squares = [x**2 for x in range(10) if x % 2 == 0]         # list comprehension
squares_gen = (x**2 for x in range(10))                    # generator expression — lazy
word_lengths = {w: len(w) for w in words}                  # dict comprehension
unique_lens = {len(w) for w in words}                       # set comprehension
```

- **List comprehensions** are generally faster than equivalent `for` loops with `.append()` — the loop is implemented in C.
- **Generator expressions** don't build the whole sequence in memory — use for large/streaming data.

### Collections module essentials

```python
from collections import defaultdict, Counter, deque, namedtuple, OrderedDict

counts = Counter(['a', 'b', 'a', 'c', 'a'])       # Counter({'a': 3, 'b': 1, 'c': 1})
groups = defaultdict(list)                          # auto-creates missing keys
q = deque(maxlen=100)                                # O(1) append/pop both ends — use for queues, not list
Point = namedtuple('Point', ['x', 'y'])              # lightweight immutable record
```

### `dataclasses` (modern struct-like classes)

```python
from dataclasses import dataclass, field

@dataclass
class Order:
    id: int
    items: list[str] = field(default_factory=list)
    total: float = 0.0
```

Auto-generates `__init__`, `__repr__`, `__eq__` — eliminates boilerplate for
data-holding classes.

---

## 4. Functions, Scope, and Closures

### LEGB scope resolution
Python resolves names in order: **L**ocal → **E**nclosing → **G**lobal →
**B**uilt-in.

```python
def outer():
    x = "enclosing"
    def inner():
        nonlocal x       # modify the enclosing scope's variable
        x = "modified"
    inner()
    print(x)              # "modified"
```

`global` does the same for module-level variables from inside a function.

### `*args`, `**kwargs`

```python
def f(a, b, *args, c=10, **kwargs):
    # args: extra positional args as a tuple
    # kwargs: extra keyword args as a dict
    ...

f(1, 2, 3, 4, c=5, d=6)  # a=1, b=2, args=(3,4), c=5, kwargs={'d':6}
```

### First-class functions & closures

```python
def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier   # closure — remembers `n` from enclosing scope

double = make_multiplier(2)
double(5)  # 10
```

### Lambda
`add = lambda a, b: a + b` — anonymous, single-expression functions; used
mainly as short callback arguments (`sorted(items, key=lambda x: x.date)`).
Avoid multi-line logic in lambdas — use a named `def` instead for readability.

---

## 5. Decorators

A decorator wraps a function to add behavior without modifying its body —
Python's core mechanism for cross-cutting concerns (logging, timing, caching,
auth checks, retries).

```python
import functools
import time

def timed(func):
    @functools.wraps(func)   # preserves func.__name__/docstring — don't skip this
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.perf_counter() - start:.4f}s")
        return result
    return wrapper

@timed
def slow_query():
    time.sleep(1)
```

### Decorators with arguments

```python
def retry(times=3):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exc = None
            for _ in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exc = e
            raise last_exc
        return wrapper
    return decorator

@retry(times=5)
def flaky_call(): ...
```

### Built-in decorators worth knowing
`@staticmethod`, `@classmethod`, `@property`, `@functools.lru_cache`,
`@functools.cached_property`, `@dataclass`, `@contextmanager` (from
`contextlib`, turns a generator into a `with`-usable context manager).

---

## 6. Iterators & Generators

An **iterable** implements `__iter__`; an **iterator** implements
`__iter__` and `__next__` and maintains state between calls. Every iterator
is an iterable, not vice versa.

```python
class CountUp:
    def __init__(self, limit):
        self.limit = limit
        self.n = 0
    def __iter__(self):
        return self
    def __next__(self):
        if self.n >= self.limit:
            raise StopIteration
        self.n += 1
        return self.n
```

**Generators** — the easy way to write an iterator: any function with
`yield` becomes one, pausing/resuming state automatically.

```python
def fibonacci(limit):
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b

for n in fibonacci(100):
    print(n)
```

**Why it matters:** generators are lazy — `fibonacci(10_000_000)` uses
constant memory regardless of how many values it could produce, unlike
building a list upfront. This is the backbone of streaming/memory-efficient
data pipelines.

`yield from` delegates to a sub-generator; `send()`/`throw()` allow two-way
communication (basis of `asyncio` coroutines pre-`async`/`await` syntax).

---

## 7. OOP in Python

```python
class Animal:
    species_count = 0                      # class attribute — shared across instances

    def __init__(self, name):
        self.name = name                    # instance attribute
        Animal.species_count += 1

    def speak(self):                        # instance method
        raise NotImplementedError

    @classmethod
    def from_dict(cls, data):               # alternate constructor
        return cls(data["name"])

    @staticmethod
    def is_valid_name(name):                # no access to self/cls — pure utility
        return bool(name.strip())

    @property
    def display_name(self):                 # computed attribute, accessed like a field
        return self.name.title()


class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof"
```

### Method Resolution Order (MRO) & multiple inheritance

```python
class A:
    def greet(self): return "A"
class B(A):
    def greet(self): return "B"
class C(A):
    def greet(self): return "C"
class D(B, C):
    pass

D().greet()          # "B" — resolved via C3 linearization
D.__mro__             # (D, B, C, A, object)
```

Python uses **C3 linearization** to compute a consistent MRO — resolves the
"diamond problem" deterministically. `super()` follows this MRO chain, not
just the immediate parent — critical for cooperative multiple inheritance
(e.g., mixins).

### Dunder (magic) methods

| Method | Enables |
|---|---|
| `__init__`, `__new__` | Object construction |
| `__repr__`, `__str__` | `repr(obj)` (debug) vs `str(obj)` (display) |
| `__eq__`, `__hash__`, `__lt__` | `==`, use in sets/dicts, sorting |
| `__len__`, `__getitem__`, `__iter__` | `len(obj)`, `obj[i]`, `for x in obj` |
| `__enter__`, `__exit__` | `with obj:` context manager protocol |
| `__call__` | Make instances callable like functions |
| `__add__`, `__sub__`, etc. | Operator overloading |

### Abstract base classes / interfaces

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): ...
```

Instantiating `Shape()` directly raises `TypeError`; subclasses must
implement `area()`. Python also supports **structural typing** via
`typing.Protocol` — duck typing with static-type-checker support, no
inheritance required.

---

## 8. Memory Model & Garbage Collection

- Everything is an object; variables are **references** (names bound to
  objects), not the objects themselves — assignment copies the reference,
  not the data (`b = a` means both names point to the same list).
- **Reference counting** is the primary GC mechanism — an object is freed the
  instant its refcount hits zero (deterministic, unlike Java/Go's tracing
  GCs).
- A supplementary **generational cyclic garbage collector** (`gc` module)
  handles reference cycles (e.g., two objects referencing each other) that
  refcounting alone can't free.
- `copy.copy()` (shallow — top-level copy, nested objects still shared) vs
  `copy.deepcopy()` (recursively copies everything) — a very common bug
  source with nested lists/dicts.

```python
import copy
original = {"items": [1, 2, 3]}
shallow = copy.copy(original)
shallow["items"].append(4)
original["items"]   # [1, 2, 3, 4]  <-- mutated! nested list was shared
```

---

## 9. Concurrency: the GIL, Threading, Multiprocessing, Asyncio

### The GIL (Global Interpreter Lock)

CPython's GIL allows only **one thread to execute Python bytecode at a
time**, even on a multi-core machine. This is the single most-asked Python
systems-design interview topic.

| Workload type | Best concurrency tool | Why |
|---|---|---|
| **I/O-bound** (network calls, disk, DB queries) | `threading` or `asyncio` | Threads release the GIL during I/O waits — real concurrency for I/O even with the GIL |
| **CPU-bound** (heavy computation) | `multiprocessing` | Separate processes = separate GILs = true parallelism across cores |
| **High-concurrency I/O** (thousands of connections) | `asyncio` | Single-threaded event loop avoids thread overhead/context-switch cost entirely |

> Note: Python 3.13 introduced an experimental **free-threaded build** (PEP
> 703, no-GIL) — not yet the default in most production deployments as of
> this writing, but the direction the language is heading.

### `threading`

```python
import threading

def worker(n):
    print(f"worker {n}")

threads = [threading.Thread(target=worker, args=(i,)) for i in range(5)]
for t in threads: t.start()
for t in threads: t.join()
```

Use `threading.Lock` to protect shared mutable state — GIL prevents
bytecode-level tearing but does **not** prevent logical race conditions
(e.g., non-atomic `counter += 1` across threads).

### `multiprocessing`

```python
from multiprocessing import Pool

def square(n):
    return n * n

with Pool(processes=4) as pool:
    results = pool.map(square, range(100))
```

Each process has its own interpreter and memory space (no GIL contention),
but data passed between processes must be **pickled** — adds serialization
overhead, and shared state requires explicit tools (`multiprocessing.Value`,
`Manager`).

### `asyncio`

```python
import asyncio

async def fetch(url):
    await asyncio.sleep(1)   # simulates non-blocking I/O
    return f"data from {url}"

async def main():
    results = await asyncio.gather(*[fetch(u) for u in urls])

asyncio.run(main())
```

Single-threaded cooperative multitasking — a coroutine yields control at
every `await`. Extremely efficient for thousands of concurrent I/O-bound
tasks (web servers, API clients), but a single CPU-heavy synchronous call
inside a coroutine blocks the *entire* event loop — offload it via
`loop.run_in_executor()` or `asyncio.to_thread()`.

---

## 10. Error Handling

```python
class InsufficientFundsError(Exception):
    """Raised when an account balance can't cover a withdrawal."""

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(f"cannot withdraw {amount} from {balance}")
    return balance - amount

try:
    withdraw(100, 150)
except InsufficientFundsError as e:
    log.warning("withdrawal rejected: %s", e)
except (TypeError, ValueError) as e:
    log.error("bad input: %s", e)
else:
    print("succeeded")          # runs only if no exception
finally:
    close_connection()          # always runs — cleanup
```

- **Custom exceptions** should subclass `Exception` (never bare `except:` —
  it also catches `KeyboardInterrupt`/`SystemExit`).
- **`raise ... from e`** preserves the original traceback context when
  re-raising as a different exception type — critical for debuggability.
- **Context managers (`with`)** guarantee cleanup even on exception — prefer
  over manual `try/finally` for resource management (files, locks, DB
  connections).

```python
from contextlib import contextmanager

@contextmanager
def db_transaction(conn):
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()
```

---

## 11. Typing (Modern Python)

Python remains dynamically typed at runtime, but **type hints** (checked by
external tools like `mypy`/`pyright`, not enforced by the interpreter) are
now standard for production code:

```python
from typing import Optional

def get_user(user_id: int) -> Optional[dict]:
    ...

def process(items: list[str], limit: int = 10) -> dict[str, int]:
    ...
```

`Optional[X]` is shorthand for `X | None`. Since 3.10, `X | None` is
preferred directly. `typing.Protocol` enables structural typing; `TypedDict`
types dict shapes; `Generic` for user-defined generic classes.

---

## 12. Standard Library Highlights

| Module | Use for |
|---|---|
| `itertools` | `chain`, `groupby`, `product`, `combinations` — composable iterator building blocks |
| `functools` | `lru_cache`, `reduce`, `partial`, `wraps` |
| `pathlib` | Modern, object-oriented filesystem paths (`Path("data") / "file.csv"`) — prefer over `os.path` |
| `datetime` | Always store/compare in UTC; use `zoneinfo` (3.9+) for timezone-aware handling |
| `json` | Serialization; `dataclasses` + `json` is a common lightweight DTO pattern |
| `logging` | Structured, leveled logging — never use bare `print()` in production code |
| `re` | Regular expressions |
| `unittest.mock` | Patching dependencies in tests |

---

## 13. Testing with `pytest`

```python
import pytest

def test_withdraw_success():
    assert withdraw(100, 50) == 50

def test_withdraw_insufficient_funds():
    with pytest.raises(InsufficientFundsError):
        withdraw(100, 150)

@pytest.fixture
def db_connection():
    conn = create_test_db()
    yield conn
    conn.close()

@pytest.mark.parametrize("balance,amount,expected", [
    (100, 50, 50),
    (200, 200, 0),
])
def test_withdraw_parametrized(balance, amount, expected):
    assert withdraw(balance, amount) == expected
```

- **Fixtures** handle setup/teardown, injected by name (like Playwright's
  fixture model — same underlying idea of declarative dependency injection).
- **`unittest.mock.patch`** replaces real dependencies (API calls, DB
  clients) with test doubles.
- **Coverage** via `pytest-cov`; **property-based testing** via `hypothesis`
  for generating edge-case inputs automatically.

---

## 14. Packaging & Environments

- **Virtual environments** (`venv`, or faster tools like `uv`/`poetry`)
  isolate project dependencies from the system Python — always use one; never
  `pip install` into system Python for project work.
- **`pyproject.toml`** is the modern standard for project metadata and build
  config (replacing `setup.py`/`requirements.txt` sprawl), per PEP 621.
- **Lockfiles** (`poetry.lock`, `uv.lock`, `Pipfile.lock`) pin exact
  transitive dependency versions for reproducible installs — distinct from
  the version *ranges* declared in `pyproject.toml`.

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .            # editable install for local development
```

---

## 15. Performance Notes

- **Profile before optimizing** — `cProfile`, `line_profiler`, or `py-spy`
  (sampling profiler, safe for production). Guessing at hot paths wastes
  effort.
- **String concatenation in a loop** (`s += x`) is O(n²) — use
  `"".join(list_of_strings)` instead.
- **`lru_cache`** memoizes pure functions trivially:
  ```python
  from functools import lru_cache

  @lru_cache(maxsize=None)
  def fib(n):
      return n if n < 2 else fib(n-1) + fib(n-2)
  ```
- For genuinely hot numeric code, drop to **NumPy** (vectorized C loops) or
  consider **Cython**/**Rust extensions** rather than hand-optimizing pure
  Python.
- `__slots__` on classes with many instances reduces per-instance memory
  overhead by skipping the per-instance `__dict__`.

---

## 16. Interview-Ready Q&A

**Q: What is the GIL and why does it exist?**
A: The Global Interpreter Lock ensures only one thread executes Python
bytecode at a time in CPython, simplifying memory management (reference
counting doesn't need to be thread-safe with fine-grained locks). It means
`threading` doesn't give CPU parallelism for CPU-bound work — use
`multiprocessing` for that — but threads still help I/O-bound work since the
GIL is released during blocking I/O calls.

**Q: Mutable default arguments — what's the bug and the fix?**
A: A mutable default (`def f(x=[])`) is evaluated once at function
definition time and shared across all calls that don't pass their own
argument, so mutations persist and leak between calls. Fix: default to
`None` and construct the mutable object inside the function body.

**Q: Difference between a list and a generator, and when to use each?**
A: A list is eagerly evaluated and fully materialized in memory; a generator
is lazily evaluated, producing one value at a time and using constant
memory. Use generators for large or unbounded/streaming data where you don't
need random access or to iterate more than once; use lists when you need
indexing, length, or multiple passes.

**Q: `is` vs `==`?**
A: `==` checks value equality (calls `__eq__`); `is` checks object identity
(same memory address). Use `is` only for singleton checks (`None`, `True`,
`False`); use `==` everywhere else. Relying on `is` for small int/string
caching behavior is undefined/implementation-specific — don't do it.

**Q: How does Python resolve method calls in multiple inheritance?**
A: Via the Method Resolution Order (MRO), computed with C3 linearization —
a deterministic left-to-right, depth-first order that also respects each
class's local order, resolving the diamond problem consistently.
`super()` walks this MRO chain, not just the direct parent, which is what
makes cooperative multiple inheritance (mixins) work correctly.

**Q: When would you choose `asyncio` over `threading` for I/O-bound work?**
A: When you need to handle very high concurrency (thousands of simultaneous
I/O operations, e.g., an API gateway) — asyncio's single-threaded event loop
avoids the memory and context-switching overhead of thousands of OS threads.
Threading is simpler to reason about for moderate concurrency or when
integrating with blocking libraries that have no async equivalent.

**Q: What's the difference between `@staticmethod`, `@classmethod`, and a
regular instance method?**
A: An instance method receives `self` (the instance) and can access/mutate
instance state. A `@classmethod` receives `cls` (the class) instead —
commonly used for alternate constructors that need to know the actual class
(important for subclassing). A `@staticmethod` receives neither — it's just
a regular function namespaced inside the class for organizational purposes.

**Q: Shallow copy vs deep copy — where does this bite people?**
A: `copy.copy()` duplicates only the top-level container; nested mutable
objects (lists inside a dict, etc.) are still shared references. Mutating a
nested object through the copy also mutates the original. `copy.deepcopy()`
recursively duplicates everything. The bug shows up most often with
default-value dicts/lists of dicts and cache/config objects passed "by copy"
that turn out not to be fully independent.

---

## 17. One-Line Summary

**Python trades raw execution speed for expressiveness and a "batteries
included" ecosystem — write CPU-bound work in C/NumPy or use
multiprocessing, lean on asyncio/threading for I/O-bound concurrency, and
let the GIL, reference counting, and dynamic typing shape every performance
and concurrency decision you make.**
