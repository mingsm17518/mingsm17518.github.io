---
title: 04_Counting_Liars
tags:
categories: Complete_Search
---
# 问题描述

USACO 2022 US Open Contest, Bronze Problem 2. Counting Liars
https://usaco.org/index.php?page=viewproblem2&cpid=1228

农夫约翰有 $N$ 头奶牛（不包括 Bessie）。每头牛给出一条关于 Bessie 躲藏位置的陈述：

- 若某头牛说 $L$ ：意思是 _Bessie 的位置 $≤ p$
- 若某头牛说 $G$ ：意思是 _Bessie 的位置 $≥ p$

$0≤p≤10^9，1≤N≤1000$
    
可能并非所有牛都说了真话，你需要找出至少要让多少头牛说谎，才能使得剩下的陈述存在某个位置 $x$ 满足所有剩余陈述。

**输出最少必须说谎的牛数。**

# 样例

### 样例 1

输入：

```
2
G 3
L 5
```

代表：
- Cow1：Bessie ≥ 3
- Cow2：Bessie ≤ 5
显然 3 ≤ Bessie ≤ 5 有解，所以 **0** 头说谎。

输出 :

```
0
```

### 样例 2

输入：

```
2
G 3
L 2
```

代表：
- Bessie ≥ 3
- Bessie ≤ 2
没有位置能同时满足，必须至少删除一条陈述 → 答案是 **1**。

输出 :

```
1
```
# 思路

在我们对输入进行排序后，一个重要的观察是，如果贝西位于位置 $x$ ，那么说谎的牛的数量就是所有位置小于 $x$ 且说 "L" 的牛，加上所有位置大于 $x$ 且说 "G" 的牛。

也就是说，如果把所有 $p$ 排好序，只需考虑每个 $p_i$ 本身作为分界。

因此，我们可以遍历每头牛的位置，通过使用正向循环和反向循环来计算说谎者的总数。

答案是我们在所有遍历过的位置中最小的说谎者数量。
# 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n; cin >> n;
    vector<pair<int, char>> cow(n);
    for(int i = 0; i < n; i++){
        cin >> cow[i].second >> cow[i].first;
    }
    sort(cow.begin(), cow.end());
    
    vector<int> left_lying(n);
    for(int i = 1; i < n; i++){
        left_lying[i] = left_lying[i-1];
        if(cow[i-1].second == 'L'){
            left_lying[i] ++;
        }
    }
    
    vector<int> right_lying(n);
    for(int i = n - 2; i >= 0; i--){
        right_lying[i] = right_lying[i+1];
        if(cow[i+1].second == 'G'){
            right_lying[i]++;
        }
    }
    
    int ans = n;
    for(int i = 0; i < n; i++){
        ans = min(ans, left_lying[i] + right_lying[i]);
    }
    cout << ans;
    return 0;
}
```