---
title: Binary Search 二分搜索
categories: Sorting & Searching
tags:
---
# 有序数组的二分搜索

## Example - Counting Haybales

https://usaco.org/index.php?page=viewproblem2&cpid=666

```python
import sys

sys.stdin = open("haybales.in", "r")
sys.stdout = open("haybales.out", "w")

N, Q = map(int, input().split())

arr = sorted(list(map(int, input().split())))

def at_most(x: int) -> int:
    lo = 0
    hi = len(arr)
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] <= x:
            lo = mid + 1
        else:
            hi = mid
    return lo

for _ in range(Q):
    a, b = map(int, input().split())
    ans = at_most(b) - at_most(a - 1)
    print(ans)
```