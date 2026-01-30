# Two Pointers 双指针

双指针方法通过在数组中迭代两个指针来跟踪满足某些条件的索引。有两种常见的变体：

1. 两个指针从数组的两端开始，并相互移动。
    
2. 两个指针以不同速度沿同一方向移动。这种变体被称为滑动窗口算法。

## Sum of Two Values

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