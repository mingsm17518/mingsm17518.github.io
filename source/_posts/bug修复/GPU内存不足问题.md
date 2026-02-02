---
title: bug修复：GPU内存不足问题
tags:
  - bug修复
  - GPU内存不足
categories: bug修复
---
```Bash
nvidia-smi

kill -9 34069  # 占用最多的进程

# 或者使用pkill
pkill -f "python"
```

