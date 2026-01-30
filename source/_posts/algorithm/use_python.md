# 输入

## 读入单行

```python
a, b = map(int, input().split())
print(a+b)
```

## 读入多行

```python
import sys

for line in sys.stdin:
    list1 = map(int, line.strip().split())
    print(sum(list1))
```

## `readline()` 、`readlines()` 和 `read()` 区别

```python
import sys

# 输入：
# Hello
# World
# !

# 使用 readline()
line1 = sys.stdin.readline()  # "Hello\n"
line2 = sys.stdin.readline()  # "World\n"
line3 = sys.stdin.readline()  # "!\n"
line4 = sys.stdin.readline()  # ""

# 使用 readlines()
lines = sys.stdin.readlines()  # ["Hello\n", "World\n", "!\n"]

# 使用 read()
content = sys.stdin.read()  # "Hello\nWorld\n!\n"
```

## `strip()` 函数

```python
s = "  hello  \n\t"

print(repr(s.rstrip()))  # 移除右侧空白字符 → "'  hello'"
print(repr(s.lstrip()))  # 移除左侧空白字符 → "'hello  \n\t'"
print(repr(s.strip()))   # 移除两侧空白字符 → "'hello'"
```

## `split()` 函数

```python
str.split(sep=None, maxsplit=-1)
```

- **sep**：分隔符，默认为任何空白字符
- **maxsplit**：最大分割次数，默认为 -1（不限制）

