---
title: cf
tags:
categories: algorithm
---
# 模板

```cpp
#include <bits/stdc++.h>
using namespace std;

#ifdef LOCAL
#include "algo/debug.h"
#else
#define debug(...) 42
#endif

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    //freopen("filename.in", "r", stdin);
    //freopen("filename.out", "w", stdout);
    
    return 0;
}
```
# 一些算法

对于任意两个正整数 n，m 的最小公倍数为 n×m / gcd(n,m)，其中 gcd(n,m) 为 n 和 m 的最大公约数。

subarray是截取数组中连续的一段子数组。 subsequence是序列中不连续的一段子序列

# 数据范围

int32的范围是2e9
int64是2e18

题目给的时限是1s，时间复杂度在1e7到1e8之间

# 代码

```cpp
// 自动初始化为全0
vector<int> a(n);

// 改变长度
v.resize(n);

// 输入序列
for(auto& x: a) cin >> x;
for (int i = 0; i < n; i++) a.push_back(i);

// 检查序列中是否存在 连续重复 的元素
if (std::unique(a.begin(), a.end()) != a.end()) cout << "YES\n";

// 返回最后一个字符
string.back()
a.back()

// 输出空格
cout << " \n"[i == n-1];

// 倒序排列
sort(s.rbegin(), s.rend());

// 反转
reverse(a.begin(), a.end());

// 添加到序列的末尾
a.push_back(x)

// 打印序列
for(auto x: a) cout << x << " \n"[x == a.back()];

// 找到数组 `a` 中的最大值 `mx`
int mx = *max_element(a.begin(), a.end());

```

# 华为HR

leetcode：熟悉题型和算法，各类型的题选做10-15道（保底5-8道）
针对薄弱知识点查缺补漏题号：
字符串：3，49，30
线性表:86，16，27，732
队列:641，406，899
栈:946，116，117，895
哈希表:61，729，25，554
dfs：105，112，98，494，547，1254
bfs：1091，1129，102，101，752
动态规划类题目也可以适当熟悉

常考知识点：
基本操作：输入输出处理（重点），字符串操作与ASCii码（重点）
数据结构：一维数组，栈，队列
编程思想：暴力破解（重点），递归
算法：排列组合（重点），快速排序（重点），二分查找，位运算，滑动窗口，深度优先搜索（进阶），搜索回溯（进阶）

注意：
1. 需要开摄像头，不能访问其他网页或者查找资源，可以在本地IDE调试好后拷贝到牛客网上再调试
2. 多刷一下各类算法题，难度中等及以上，在牛客有或者力扣上刷都可以
3. 熟悉牛客网考试环境，和本地环境IDE、力扣有差异
4. ACM模式自己写输入输出
5. 三道题分值100、200、300，及格150分

这个公众号可以看一下题目类型适应一下

https://www.acmcoder.com/#/practice/company

https://mp.weixin.qq.com/s/1RuKNdSYLKRja0NlWikRnA

https://mp.weixin.qq.com/s/pY0EHj0eVLgIfkDiJb0RSQ