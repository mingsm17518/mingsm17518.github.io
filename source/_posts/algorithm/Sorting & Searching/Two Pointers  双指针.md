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

## Sum of Two Values 两数之和

https://cses.fi/problemset/task/1640

### Solution - Sum of Two Values

我们要找到两个索引 $i$ 和 $j$ ，使得 $a_i + a_j = x$。

### Implementation  实现

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

## Sliding Window  滑动窗口

滑动窗口技术用于找到一个满足条件的连续子数组。

https://codeforces.com/contest/279/problem/B

### Solution - Books  解决方案 - 书籍

我们想要找到可以在 $t$ 分钟内读完的最长的连续书籍段。

为了实现这一点，我们可以定义 $\texttt{left}$ 和 $\texttt{right}$ 来表示段的开始和结束。两者都将从数组的开头开始。这些数字可以被视为指针，因此得名"双指针"。

由于两个指针最多移动 $N$ 次，整体时间复杂度为 $\mathcal{O}(N)$  。

![](../../../img/two_pointers.mp4)

### Implementation  实现

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