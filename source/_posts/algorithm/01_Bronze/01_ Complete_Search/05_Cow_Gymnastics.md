---
title: 05_Cow_Gymnastics
tags:
categories: Complete_Search
---
# 问题描述

USACO 2019 December Contest, Bronze Problem 1. Cow Gymnastics
https://usaco.org/index.php?page=viewproblem2&cpid=963

奶牛们正在进行体操训练，Bessie 记录了 K 次训练课中 N 头奶牛的排名。我们需要找出所有"一致"的奶牛对，即其中一头奶牛在**每次**训练课中都表现得比另一头要好。

$0≤N≤20，1≤K≤10$

# 样例

输入：

```
3 4
4 1 2 3
4 1 3 2
4 2 1 3
```

输出 :

```
4
```

# 思路

对于任意一对奶牛 $(i, j)$，它们的关系可能有三种情况：
1. $i$ 在每次训练课中都比 $j$ 表现好
2. $j$ 在每次训练课中都比 $i$ 表现好
3. 互有胜负（有时 $i$ 比 $j$ 好，有时 $j$ 比 $i$ 好）
只有前两种情况才符合"一致"的定义。

我们可以创建一个二维布尔数组，该数组表示在任何时间点奶牛 $A$ 的排名是否高于奶牛 $B$ 。在读取完所有排名后，对于所有 $\frac{N(N-1)}{2}$ 对，我们设置 $b[A][B]=\text{true}$ 。

然后我们遍历所有对，检查它们是否满足条件。如果两个都为真，那么这对在某个时间点改变了排名顺序。如果只有一个为真，那么这对保持了一致的顺序。因此，需要 $b[A][B]$ 和 $b[B][A]$ 中至少有一个为真，可以用异或操作 `a[i][j] ^ a[j][i]` 来检测。

### 复杂度分析

时间复杂度：$O(K×N²)$ 
空间复杂度：$O(N²)$ 
# 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("gymnastics.in", "r", stdin);
    freopen("gymnastics.out", "w", stdout);
    int k, n;
    cin >> k >> n;
    
    vector<vector<bool>>a(n, vector<bool>(n));
    for(int tt = 0; tt < k; tt++){
        vector<int> b(n);
        for(int& x:b){
            cin >> x;
            x--;
        }
        for(int i = 0; i < n; i++){
            for(int j = i+1; j < n; j++){
                a[b[i]][b[j]] = true;
            }
        }
    }
    
    int ans = 0;
    for(int i = 0; i < n; i++){
        for(int j = i+1; j < n; j++){
            ans += a[i][j] ^ a[j][i];
        }
    }
    cout << ans;
    return 0;
}
```