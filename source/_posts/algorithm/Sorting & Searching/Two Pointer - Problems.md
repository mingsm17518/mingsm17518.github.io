---
title: Two Pointer - Problems
categories: Sorting & Searching
tags:
---
# Problems 

## 01-Subarray Sums

与 [Solution - Books](Two%20Pointer%20-%20Problems.md#Solution%20-%20Books) 做法类似。不同之处在于，更新 $ans$ 时改为判断 当前子数组之和 $cur$  是否等于 目标和 $x$ ，是的话 $ans+1$ 

https://cses.fi/problemset/task/1660

```python
n, x = map(int, input().split())
arr = list(map(int, input().split()))

l = 0
cur = 0
ans = 0

for r in range(n):
    cur += arr[r]
    while cur > x:
        cur -= arr[l]
        l += 1
    if cur == x:
        ans += 1
        
print(ans)
```

## 02-Sum of Three Values

https://cses.fi/problemset/task/1641

这个问题是两数之和问题的扩展，只是现在涉及三个值。我们可以将第三个指针设置为数组中的某个值，然后问题就变成了本模块前面讨论的两数之和问题。

首先我们将数组排序。然后我们将遍历所有可能的第三个指针的值，并检查这三个指针是否加起来等于目标值 $x$ ，同时它们的位置是不同的。我们可以通过存储所有值 `{a[i],i}` 的原始位置来保持它们的位置不变。

```python
n, x = map(int, input().split())
a = list(map(int, input().split()))

p = [(a[i], i + 1) for i in range(n)]

p.sort()

for i in range(n):
    left = 0
    right = n - 1

    while left < right:
        target = x - p[i][0]

        if left != i and right != i and p[left][0] + p[right][0] == target:
            print(p[left][1], p[right][1], p[i][1])
            exit()

        # increase left if the sum is lower
        elif p[left][0] + p[right][0] < target:
            left += 1

        # otherwise decrease right
        else:
            right -= 1

print("IMPOSSIBLE")
```

