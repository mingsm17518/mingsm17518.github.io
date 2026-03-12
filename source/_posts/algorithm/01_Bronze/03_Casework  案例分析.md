---
title: 03_Casework  案例分析
categories: 01_Bronze
tags:
---
# 03_Casework 案例分析

## 什么是案例分析？

案例分析（Casework）是一种通过**分情况讨论**来解决问题的算法思想。当问题存在多种不同的情况，且每种情况需要不同的处理方式时，这种方法特别有效。

### 案例分析的特点

1. **分情况讨论**：将问题分成若干种情况分别处理
2. **逻辑清晰**：每种情况独立分析
3. **避免复杂公式**：用简单逻辑处理边界情况
4. **需要仔细分析**：确保覆盖所有可能的情况

### 适用场景

- 问题有多种边界情况
- 不同输入范围需要不同处理
- 存在特殊情况需要单独考虑
- 几何问题中需要分类讨论

### 常见错误

- 遗漏某些情况
- 情况之间有重叠未处理好
- 边界条件处理不当

---

## 题目列表

| # | 题目 | 难度 |
|---|------|------|
| 01 | Sleepy Cow Herding | ⭐⭐⭐ |
| 02 | Fence Painting | ⭐⭐ |
| 03 | Three Logos | ⭐⭐⭐ |

---

## 经典例题

### 01. Sleepy Cow Herding (USACO Bronze)

#### 题目描述

三头牛站在数轴上，编号为 a < b < c。每次可以将一头牛移动到任意位置，求：
- 最少需要多少次移动才能使三头牛相邻？
- 最多需要多少次移动才能使三头牛相邻？

#### 算法思路

**案例分析**：

**最少移动次数 (min_ans)**：
- 如果已经相邻 (c = a + 2)，答案为 0
- 如果存在间隙等于 2 (c = b + 2 或 b = a + 2)，答案为 1
- 否则答案为 2

**最多移动次数 (max_ans)**：
- 计算最大间隙减 1：`max(b - a, c - b) - 1`

#### 代码实现

```python
import sys
sys.stdin = open("herding.in", "r")
sys.stdout = open("herding.out", "w")

a, b, c = map(int, input().split())

# 最少移动次数
if c == a + 2:
    min_ans = 0
elif c == b + 2 or b == a + 2:
    min_ans = 1
else:
    min_ans = 2

# 最多移动次数
max_dis = max(b - a, c - b)
max_ans = max_dis - 1

print(min_ans)
print(max_ans)
```

#### 正确性分析

- 三头牛相邻意味着它们占据三个连续的位置
- 已经相邻时不需要移动
- 间隙为 2 时，只需移动中间的一头牛填补空位
- 其他情况需要移动两次

---

### 02. Fence Painting (USACO Bronze)

#### 题目描述

给定两段需要粉刷的栅栏区间 [a, b] 和 [c, d]，求粉刷完这两段栅栏后，被粉刷的栅栏总长度。

#### 算法思路

**案例分析**：分情况讨论两段区间的重叠关系

1. **不相交**：`b < c` 或 `d < a`，总长度为两段之和
2. **相交**：取并集长度
3. **包含**：一段完全包含另一段

#### 代码实现

```python
import sys
sys.stdin = open("paint.in", "r")
sys.stdout = open("paint.out", "w")

a, b = map(int, input().split())
c, d = map(int, input().split())

# 保证 a <= c
if a > c:
    a, c = c, a
    b, d = d, b

# 分情况讨论
if b < c:
    # 不相交
    ans = b - a + d - c
else:
    if d < b:
        # [c, d] 被 [a, b] 包含
        ans = b - a
    else:
        # 相交
        ans = d - a

print(ans)
```

#### 时间复杂度

- O(1)

---

### 03. Three Logos (CF Problem)

#### 题目描述

给定三个矩形的长和宽，判断能否将这三个矩形拼成正方形。如果能，输出正方形的边长和拼法。

#### 算法思路

**案例分析**：

1. 将每个矩形的长边设为 y，短边设为 x
2. 检查是否存在某个 y 使得三个矩形的 x 之和等于 y
3. 如果满足条件，输出结果

关键观察：
- 正方形的边长 = max(所有 y)
- 正方形的面积 = 三个矩形面积之和

#### 代码实现

```python
n = 3
arr = list(map(int, input().split()))

# 提取长和宽
xx = arr[::2]  # 短边
yy = arr[1::2]  # 长边
r = 0
sum_xy = 0
mk = [False] * 3

# 统一长边方向
for i in range(n):
    if xx[i] > yy[i]:
        xx[i], yy[i] = yy[i], xx[i]
    r = max(r, yy[i])
    sum_xy += xx[i] * yy[i]

# 检查是否能组成正方形
if r * r != sum_xy:
    print(-1)
    exit()

print(r)

H = r

# 先放置长边等于 r 的矩形
for i in range(n):
    if yy[i] == r:
        H -= xx[i]
        mk[i] = True
        ch = chr(ord('A') + i)
        for _ in range(xx[i]):
            print(ch * r)

# 放置剩余矩形
for _ in range(H):
    line2print = ""
    for i in range(n):
        if mk[i]:
            continue
        ch = chr(ord('A') + i)
        count = xx[i] if yy[i] == H else yy[i]
        line2print += ch * count
    print(line2print)
```

#### 正确性分析

- 三个矩形的面积之和必须等于正方形面积
- 正方形的边长必须是某个矩形的长边
- 需要找到合适的放置顺序
