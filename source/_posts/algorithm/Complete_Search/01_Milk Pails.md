---
title: 01_Milk Pails
date: 2025-10-29 10:56
modification date: 2026-01-30 17:43
tags:
categories: Complete_Search
---
# 问题描述

USACO 2016 February Contest, Bronze Problem 1. Milk Pails
https://usaco.org/index.php?page=viewproblem2&cpid=615

给定 $X, Y, M$ ，求 $aX + bY$ 不超过 $M$ 的最大值，$a, b$ 任意。

# 样例

输入

```
17 25 77
```

输出

```
76
```

# 思路

$a$ 的范围为 $0$ 至 $M/X$  ，$b$ 的范围为 $0$ 至 $M/Y$ 。
遍历 $a$ 和 $b$ ，如果 $aX + bY$ 不超过 $M$ ，则 $ans$ 更新为最大值。

# 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("pails.in", "r", stdin);
    freopen("pails.out", "w", stdout);
    int x, y, m;
    cin >> x >> y >> m;
    int ans = 0;
    for(int i = 0; i <= m / x; i++){
        for(int j = 0; j <= m / y; j++){
            int now = i * x + j * y;
            if(now <= m){
                ans = max(now, ans);
            }
        }
    }
    cout << ans;
    return 0;
}
```