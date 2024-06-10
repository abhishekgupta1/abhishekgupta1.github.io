---
title: "CheetSheet : PyTest"
header:
  caption: "CheetSheet : PyTest"
tags:
  - CheetSheet
  - Integration Test
toc: false  
---
---
#### Using Assertions
```
def test_addition():
    assert 1 + 1 == 2
    assert "pytest" in "I love pytest"
    assert not False

def test_string():
    assert "pytest" in "I love pytest"

def test_exception():
    with pytest.raises(ZeroDivisionError):
        1 / 0

def test_custom_message():
    assert 1 + 1 == 3, "Math is broken!"
    
```
#### Parameterized Tests
```
# test_example.py
import pytest

@pytest.mark.parametrize("a, b, expected", [
    (1, 2, 3),
    (2, 3, 5),
    (3, 4, 7),
])
def test_add(a, b, expected):
    assert a + b == expected
```

#### Running Specific Test
```
pytest test_example.py
pytest test_example.py::test_add
```

#### Run tests with verbose output:
```bash
pytest -v
```

#### Stop after the first N failures:
```bash
pytest --maxfail=2
```

#### Run tests in parallel (requires `pytest-xdist`):
```bash
pip install pytest-xdist
pytest -n 4
```

#### Test Discovery

`pytest` automatically discovers tests that:
- Are in files named `test_*.py` or `*_test.py`
- Contain functions starting with `test_`


#### Fixtures

Create reusable test setup with fixtures:

```python
import pytest

@pytest.fixture
def sample_data():
    return [1, 2, 3]

def test_sum(sample_data):
    assert sum(sample_data) == 6
```

#### Markers

Skip a test:
```python
import pytest

@pytest.mark.skip(reason="Not implemented yet")
def test_not_implemented():
    pass
```

Conditionally skip a test:
```python
@pytest.mark.skipif(condition, reason="Reason")
def test_skip_if():
    pass
```

Mark a test as expected to fail:
```python
@pytest.mark.xfail(reason="Bug 123")
def test_known_bug():
    assert False
```

#### Running Tests with Markers

Run tests with a specific marker:
```bash
pytest -m marker_name
```

#### Custom Markers

Define custom markers in `pytest.ini`:
```ini
[pytest]
markers =
    slow: marks tests as slow
```

Use custom markers in tests:
```python
@pytest.mark.slow
def test_slow_function():
    pass
```

#### Generating Reports

Generate a detailed HTML report (requires `pytest-html`):
```bash
pip install pytest-html
pytest --html=report.html
```

Generate a JUnit XML report for CI integration:
```bash
pytest --junitxml=report.xml
```

#### Debugging Tests

Run tests with Python's built-in debugger:
```bash
pytest --pdb
```

Use a breakpoint in the code:
```python
def test_debug():
    breakpoint()  # or use `import pdb; pdb.set_trace()` for older versions
    assert 1 + 1 == 2
```

#### Coverage Reports

Measure test coverage (requires `pytest-cov`):
```bash
pip install pytest-cov
pytest --cov=your_module tests/
```

Generate an HTML coverage report:
```bash
pytest --cov=your_module --cov-report=html
```

#### Test Directory Structure

Typical project structure:
```
my_project/
    src/
        my_module.py
    tests/
        test_my_module.py
```

#### Example Test File

A complete example test file:

```python
# tests/test_my_module.py

import pytest
from src.my_module import add, subtract, multiply, divide

@pytest.fixture
def sample_numbers():
    return (10, 5)

def test_add(sample_numbers):
    a, b = sample_numbers
    assert add(a, b) == 15

def test_subtract(sample_numbers):
    a, b = sample_numbers
    assert subtract(a, b) == 5

def test_multiply(sample_numbers):
    a, b = sample_numbers
    assert multiply(a, b) == 50

def test_divide(sample_numbers):
    a, b = sample_numbers
    assert divide(a, b) == 2
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(a, 0)
```