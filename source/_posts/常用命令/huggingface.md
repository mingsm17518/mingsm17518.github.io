---
title: huggingface
categories: 常用命令
tags:
---
# huggingface

## 加速下载

在服务器中下载huggingface model

首先，安装huggingface-cli。

```shell
pip install -U huggingface_hub
```

接着，设置环境变量。

```shell
# 写入 ~/.bashrc
export HF_ENDPOINT=https://hf-mirror.com
source .bashrc
```

最后下载即可。

```shell
hf download  {model_name} --local-dir {path/to/your/local_dir}
```


## 配置镜像源

```bash
export HF_ENDPOINT=https://hf-mirror.com
```