---
title: 02_Diamond_Collector
tags:
categories: Complete_Search
---
# 问题描述

USACO 2016 US Open Contest, Bronze Problem 1. Diamond Collector
https://usaco.org/index.php?page=viewproblem2&cpid=639

给定长度为 $N$ 的数组和 $K$ ，输出 $subsequence$ 最长的长度，要求 $subsequence$ 中任意两数之差不超过 $K$ 。

# 样例

input :

```
5 3
1
6
4
3
1
```

output :

```
4
```

# 思路

遍历数组中每个数 $x$ ，遍历搜索数组中有几个 $y$ 使得 $y$ 大于 $x$ 且 $y - x <= K$ ，$ans$ 更新为最长的长度。

$y$ 和 $x$ 之差不能使用 $abs$ 绝对值。因为这样会导致一个 $y$ 比 $x$ 大 $K$ ，另一个 $y$ 比 $x$ 小 $K$，那么这两个 $y$ 的差值大于 $K$，导致答案错误。
# 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("diamond.in", "r", stdin);
    freopen("diamond.out", "w", stdout);
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for(int& x:a) cin >> x;
    int ans = 0;
    for(int x: a){
        int now = 0;
        for(int y:a){
            if(y >= x && y - x <= k) now++;
        }
        ans = max(ans, now);
    }
    cout << ans;
    return 0;
}
```