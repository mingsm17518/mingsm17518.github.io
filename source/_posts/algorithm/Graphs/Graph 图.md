---
title: 图搜索算法
date: 2026-01-30 09:35:30
tags:
  - dfs
  - bfs
  - 图搜索
categories: Graphs
---

# Graph 图

## 邻接表

### python

```python
N, M = map(int, input().split())
adj = [[] for _ in range(N)]

for i in range(M):
	u, v = map(int, input().split())
	adj[u].append(v)
	adj[v].append(u)

u = 1
# print number of vertices adjacent to u
print("deg(u) =", len(adj[u]))
# print all edges with u as an endpoint
for v in adj[u]:
	print("{" + str(u) + ", " + str(v) + "}")
```

### cpp

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
	int N, M;
	cin >> N >> M;
	vector<vector<int>> adj(N);
	for (int i = 0; i < M; ++i) {
		int u, v;
		cin >> u >> v;
		adj.at(u).push_back(v);
		adj.at(v).push_back(u);
	}
	{
		int u = 1;
		// print number of vertices adjacent to u
		cout << "deg(u) = " << adj.at(u).size() << endl;
		// print all edges with u as an endpoint
		for (int v : adj.at(u)) cout << "{" << u << ", " << v << "}" << "\n";
	}
}
```

### Output

```text
deg(u) = 3
{1, 3}
{1, 4}
{1, 5}
```

# Graph Traversal  图遍历

图遍历算法按照一定的顺序访问图中的所有节点，并且在遍历过程中可以计算一些信息。两种常见的实现方式是深度优先搜索 depth first search (DFS) 和广度优先搜索 breadth first search (BFS) 。

## 前置知识

[Graph 图](Graph%20图.md)

[使用递归的穷举搜索](使用递归的穷举搜索.md)

## DFS

深度优先搜索（DFS）是一种直接的图遍历技术。该算法从起始节点开始，通过图的边访问所有从起始节点可达的其他节点。

深度优先搜索只要发现新的节点，就会一直沿着图中的单一路径进行。之后，它会返回到之前的节点并开始探索图的其他部分。该算法会记录已访问的节点，以确保每个节点只被处理一次。

![](dfs_demo.mp4)

在实现 DFS 时，我们通常使用一个递归函数来访问顶点，并使用一个数组来存储是否已经访问过某个顶点。

### cpp

```cpp
#include <bits/stdc++.h>
using namespace std;

int n = 6;
vector<vector<int>> adj(n);
vector<bool> visited(n);

void dfs(int current_node) {
	if (visited[current_node]) { return; }
	visited[current_node] = true;

	for (int neighbor : adj[current_node]) { dfs(neighbor); }
}

int main() {
	adj[0] = {1, 2, 4};
	adj[1] = {3, 4};
	adj[2] = {5};

	for (int i = 0; i < n; i++) {
		// iterate over all connected components in the graph
		if (!visited[i]) { dfs(i); }
	}
}
```

### python

```python
import sys

sys.setrecursionlimit(10**5)  # Python has a default recursion limit of 1000

n = 6
visited = [False] * n

adj = [[] for _ in range(n)]
adj[0] = [1, 2, 4]
adj[1] = [3, 4]
adj[2] = [5]


def dfs(current_node):
	visited[current_node] = True
	for neighbor in adj[current_node]:
		if not visited[neighbor]:
			dfs(neighbor)


for i in range(n):
	if not visited[i]:
		dfs(i)
```

## BFS

在广度优先搜索中，我们按照顶点与起始顶点的距离顺序来遍历顶点。

![](bfs_demo.mp4)

在实现 BFS 时，我们通常使用一个队列来跟踪下一个要访问的顶点。与 DFS 一样，我们也会维护一个数组来存储是否已经访问过某个顶点。
### cpp

```cpp
#include <queue>
#include <vector>

using std::queue;
using std::vector;

int main() {
	int n = 6;
	vector<vector<int>> adj(n);
	vector<bool> visited(n);
	
	adj[0] = {1, 2, 4};
	adj[1] = {3, 4};
	adj[2] = {5};

	for (int i = 0; i < n; i++) {
		// iterate over all connected components in the graph
		if (!visited[i]) {
			queue<int> q;
			q.push(i);
			visited[i] = true;
			while (!q.empty()) {
				int current_node = q.front();
				q.pop();
				for (int neighbor : adj[current_node]) {
					if (!visited[neighbor]) {
						visited[neighbor] = true;
						q.push(neighbor);
					}
				}
			}
		}
	}
}
```

### python

```python
from collections import deque

n = 6
adj = [[] for _ in range(n)]
visited = [False] * n

adj[0] = [1, 2, 4]
adj[1] = [3, 4]
adj[2] = [5]

for i in range(n):
	# iterate over all connected components in the graph
	if not visited[i]:
		q = deque([i])

		while q:
			node = q.popleft()
			visited[node] = True

			for neighbor in adj[node]:
				if not visited[neighbor]:
					q.append(neighbor)
```


## 应用

### Connected Components  连通分量

https://cses.fi/problemset/task/1666

一个连通分量是无向图中一个最大的连通节点集合。换句话说，两个节点位于同一个连通分量中，当且仅当它们可以通过图中的边相互到达。

在上述重点问题中，目标是添加尽可能少的边，使得整个图形成一个单一的连通分量。

#### Solution - Building Roads

请注意，每条边会将连通分量的数量减少零个或一个。因此，您必须至少添加 $C-1$ 条边，其中 $C$ 是输入图中的连通分量数量。

为了计算 $C$ ，可以遍历每个节点。如果该节点尚未被访问，则使用 DFS 或 BFS 访问该节点及其所在连通分量的所有其他节点。然后 $C$ 等于我们执行访问操作的次数。

有许多有效的方法可以选择 $C−1$ 条新的道路来建设。一种方法是为每个 $C$ 连通分量选择一个代表节点，并将它们连接成一条线。

#### BFS

```python
import sys

sys.setrecursionlimit(10 ** 6)

n, m = map(int, input().split())

adj = [[] for _ in range(n)]
visited = [False] * n

for _ in range(m):
    u, v = map(int, input().split())
    u -= 1
    v -= 1
    adj[u].append(v)
    adj[v].append(u)

c = 0

connect = []

def dfs(node):
    visited[node] = True
    for v in adj[node]:
        if not visited[v]:
            dfs(v)
    
for i in range(n):
    if not visited[i]:
        c += 1
        connect.append(i)
        dfs(i)

print(c-1)
for i in range(c-1):
    print(connect[i]+1, connect[i+1]+1)
```

#### DFS

```python
from collections import deque

n, m = map(int, input().split())

adj = [[] for _ in range(n)]
visited = [False] * n

for _ in range(m):
    u, v = map(int, input().split())
    u -= 1
    v -= 1
    adj[u].append(v)
    adj[v].append(u)

c = 0

connect = []
    
for i in range(n):
    if not visited[i]:
        c += 1
        connect.append(i)
        q = deque([i])
        while q:
            node = q.popleft()
            visited[node] = True
            for v in adj[node]:
                if not visited[v]:
                    q.append(v)

print(c-1)
for i in range(c-1):
    print(connect[i]+1, connect[i+1]+1)
```

### Graph Two-Coloring  图的二色染色

https://cses.fi/problemset/task/1668

图的二色化指的是为图中的每个节点分配一个布尔值，该值由边的配置决定。最常见的二色图例子是二分图，在这种图中，每条边连接两个颜色不同的节点。

在上述重点问题中，目标是将图中的每个节点（朋友）分配到两种颜色（队伍）之一，满足边（友谊）连接两个颜色不同的节点的约束条件。换句话说，我们需要检查输入是否为二分图，如果是，则输出一种有效的着色方案。