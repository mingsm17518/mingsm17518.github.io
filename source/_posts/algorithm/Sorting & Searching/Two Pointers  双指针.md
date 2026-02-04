---
title: Two Pointers  双指针
categories: Sorting & Searching
tags:
  - 双指针
---
# Two Pointers 双指针

## 概念

双指针方法通过在数组中迭代两个指针来跟踪满足某些条件的索引。有两种常见的变体：

1. 两个指针从数组的两端开始，并相互移动。
    
2. 两个指针以不同速度沿同一方向移动。这种变体被称为滑动窗口算法。

## Sum of Two Values

https://cses.fi/problemset/task/1640

### Solution

我们要找到两个索引 $i$ 和 $j$ ，使得 $a_i + a_j = x$。

我们可以先对数组进行排序。然后，将左指针初始化在数组的开头（ $l=0$ ），将右指针初始化在末尾（ $r=N−1$ ）。

当 $l<r$ ：
	如果 $a[l] + a[r] == x$ ，我们就找到了目标和。
	如果 $a[l]+a[r]<x$ ，和太小。为了增加和，我们增加 $l$  
    如果 $a[l]+a[r]>x$ ，和太大。为了减少和，我们减少 $r$

由于数组已排序，将左指针向右移动永远不会减少和，将右指针向左移动永远不会增加和。

### Implementation

**Time Complexity:** $\mathcal{O}(N \log N)$  时间复杂度： $\mathcal{O}(N \log N)$ 

```python
n, x = map(int, input().split())

nums = [(int(val), i) for i, val in enumerate(input().split())]
nums.sort()

l = 0
r = n - 1
while l < r:
	sum = nums[l][0] + nums[r][0]
	if sum == x:
		print(nums[l][1] + 1, nums[r][1] + 1)
		exit()
	elif sum < x:
		l += 1
	else:
		r -= 1

print("IMPOSSIBLE")
```

## Sliding Window

滑动窗口方法是双指针技术的一种变体，其中两个指针沿同一方向移动以维护一个特定的元素范围或"窗口"。虽然标准双指针通常相互靠近移动，但滑动窗口技术用于找到一个满足条件的连续子数组。

https://codeforces.com/contest/279/problem/B

### Solution - Books

我们想要找到可以在 $t$ 分钟内读完的最长的连续书籍段，即寻找最长的连续子数组，要求子数组的和小于 $t$ 

为了实现这一点，我们可以定义 $\texttt{left}$ 和 $\texttt{right}$ 来表示段的开始和结束。两者都将从数组的开头开始。这些数字可以被视为指针，因此得名"双指针"。

由于两个指针最多移动 $N$ 次，整体时间复杂度为 $\mathcal{O}(N)$  。

![](../../../img/two_pointers.mp4)

### Implementation

```python
n, t = map(int, input().split())
timeNeed = list(map(int, input().split()))

l = 0
sum_time = 0
ans = 0

for r in range(n):
    sum_time += timeNeed[r]
    while sum_time > t and l <= r:
        sum_time -= timeNeed[l]
        l += 1
    ans = max(ans, r - l + 1)

print(ans)
```


