---
title: 02_Complete Search  完全搜索
categories: 01_Bronze
tags:
---
# 02_Complete Search 完全搜索

## 什么是完全搜索？

完全搜索（Complete Search / Brute Force）是一种通过**枚举所有可能的情况**来解决问题的算法思想。虽然听起来简单，但在 Bronze 级别中非常有效。

### 完全搜索的特点

1. **枚举所有可能性**：遍历问题的整个解空间
2. **简单直接**：不需要复杂的数学推导
3. **适合小规模数据**：当解空间较小时非常有效
4. **往往能通过 Bronze 题目**：数据规模通常在可枚举范围内

### 适用场景

- 数据规模较小（通常 n ≤ 100~1000）
- 需要找出满足某些条件的最优解
- 无法直接推导出公式解时

### 常见优化技巧

- **剪枝**：提前排除不可能的情况
- **利用数据结构**：使用集合、数组等加速查找
- **避免重复计算**：记录已经计算过的结果

---

## 题目列表

| # | 题目 | 难度 |
|---|------|------|
| 01 | Milk Pails | ⭐⭐ |
| 02 | Diamond Collector | ⭐⭐ |
| 03 | Daisy Chains | ⭐⭐ |
| 04 | Counting Liars | ⭐⭐ |
| 05 | Cow Gymnastics | ⭐⭐⭐ |
| 06 | Bovine Genomics | ⭐⭐⭐ |

---

## 经典例题

### 01. Milk Pails (USACO Bronze)

#### 题目描述

给定两个水桶容量 x 和 y，以及最大容量 m，求使用这两个水桶能装下的最大牛奶量（不超过 m）。

#### 算法思路

**完全搜索**：枚举所有可能的取水次数，找到不超过 m 的最大组合。

遍历所有可能的取水次数组合 (i, j)：
- i * x + j * y ≤ m
- 取最大值

#### 代码实现

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

#### 时间复杂度

- O((m/x) × (m/y)) ≈ O(m²)

---

### 02. Diamond Collector (USACO Bronze)

#### 题目描述

给定 n 颗钻石的大小和大小差上限 k，找出一个大小差不超过 k 的最大钻石集合。

#### 算法思路

**完全搜索 + 优化**：枚举每个可能的起始钻石，统计在 [x, x+k] 范围内的钻石数量。

#### 代码实现

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
    for(int& x: a) cin >> x;

    int ans = 0;
    for(int x: a){
        int now = 0;
        for(int y: a){
            if(y >= x && y - x <= k) now++;
        }
        ans = max(ans, now);
    }

    cout << ans;
    return 0;
}
```

#### 时间复杂度

- O(n²)

---

### 03. Daisy Chains (USACO Bronze)

#### 题目描述

给定 n 朵花的美丽值，求有多少个子序列的平均值等于其中的某朵花。

#### 算法思路

**完全搜索**：枚举所有子序列 [i, j]，计算平均值，判断是否有花朵的美丽值等于平均值。

#### 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n);
    for(int& x: a) cin >> x;

    int ans = 0;
    for(int i = 0; i < n; i++){
        for(int j = i; j < n; j++){
            int sum = 0;
            for(int ii = i; ii <= j; ii++){
                sum += a[ii];
            }
            double avg = 1.0 * sum / (j - i + 1);
            for(int ii = i; ii <= j; ii++){
                if(a[ii] == avg){
                    ans++;
                    break;
                }
            }
        }
    }

    cout << ans;
    return 0;
}
```

#### 时间复杂度

- O(n³)

---

### 04. Counting Liars (USACO Bronze)

#### 题目描述

给定 n 头牛的位置和每头牛说真话(L)或说假话(G)的状态，找出一个位置使得说谎的牛最少。

#### 算法思路

**完全搜索**：枚举每个可能的位置，计算该位置处说谎的牛数量，取最小值。

优化：先排序，然后利用前缀和/后缀和加速计算。

#### 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<pair<int, char>> cow(n);
    for(int i = 0; i < n; i++){
        cin >> cow[i].second >> cow[i].first;
    }
    sort(cow.begin(), cow.end());

    vector<int> left_lying(n);
    for(int i = 1; i < n; i++){
        left_lying[i] = left_lying[i-1];
        if(cow[i-1].second == 'L'){
            left_lying[i]++;
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

#### 时间复杂度

- O(n log n) 排序 + O(n) 搜索

---

### 05. Cow Gymnastics (USACO Bronze)

#### 题目描述

给定 k 次训练中 n 头牛的排名，找出有多少对牛 (i, j) 满足：在所有训练中，i 始终排在 j 前面。

#### 算法思路

**完全搜索**：记录每对牛 (i, j) 在所有训练中 i 是否都在 j 前面。

- 使用二维布尔数组 `a[i][j]` 表示 i 是否在 j 前面
- 对每对牛检查是否在所有训练中都成立

#### 代码实现

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
    vector<vector<bool>> a(n, vector<bool>(n));

    for(int tt = 0; tt < k; tt++){
        vector<int> b(n);
        for(int& x: b){
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

#### 时间复杂度

- O(k × n²)

---

### 06. Bovine Genomics (USACO Bronze)

#### 题目描述

给定 n 头有斑点的牛和 n 头无斑点的牛的基因序列（长度为 m），找出有多少列满足：该列中所有有斑点的牛和无斑点的牛的基因完全不同。

#### 算法思路

**完全搜索**：对每一列，检查有斑点的牛的基因是否与无斑点的牛的基因有交集。

- 对每列建立基因计数数组
- 检查无斑点牛是否有相同的基因

#### 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

int char2idx(char c){
    switch (c) {
        case 'A': return 0;
        case 'C': return 1;
        case 'G': return 2;
        case 'T': return 3;
        default:  return -1;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("cownomics.in", "r", stdin);
    freopen("cownomics.out", "w", stdout);

    int n, m;
    cin >> n >> m;

    vector<vector<char>> spot(n, vector<char>(m));
    vector<vector<char>> plain(n, vector<char>(m));

    for(int i = 0; i < n; i++){
        for(int j = 0; j < m; j++){
            cin >> spot[i][j];
        }
    }

    for(int i = 0; i < n; i++){
        for(int j = 0; j < m; j++){
            cin >> plain[i][j];
        }
    }

    int ans = 0;
    for(int j = 0; j < m; j++){
        vector<int> check(4, 0);
        bool is_valid = true;

        // 统计有斑点牛的基因
        for(int i = 0; i < n; i++){
            check[char2idx(spot[i][j])]++;
        }

        // 检查无斑点牛是否有相同基因
        for(int i = 0; i < n; i++){
            if(check[char2idx(plain[i][j])]){
                is_valid = false;
                break;
            }
        }

        if(is_valid){
            ans++;
        }
    }

    cout << ans;
    return 0;
}
```

#### 时间复杂度

- O(m × n)
