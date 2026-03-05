---
title: conda & uv
categories: 常用命令
tags:
---
# conda

创建新环境

```bash
conda create -n <env_name> python=3.8
conda activate <env_name>
```

删除环境

```bash
conda env list
conda env remove -n <env_name>
```

# uv

```bash
uv init
uv venv .venv
source .venv/bin/activate
```