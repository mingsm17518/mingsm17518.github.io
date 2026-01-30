---
title: expected str, bytes or os.PathLike object, not MultiplexedPath
date: 2026-01-30 16:29:09
tags:
  - bug修复
  - TypeError
categories: bug修复
---

错误信息显示：

`TypeError: expected str, bytes or os.PathLike object, not MultiplexedPath`

  

这个错误是因为 `tn`库（text normalization库）在创建缓存目录时收到了一个 `MultiplexedPath`对象而不是字符串路径。

`MultiplexedPath`是 HuggingFace 的 `huggingface_hub`库中的类型，通常用于处理多个缓存位置。

  

查看错误栈，问题出现在：

`File "/home/bysx/index-tts-vllm2/indextts/utils/front.py", line 111, in load`

`self.en_normalizer = NormalizerEn(overwrite_cache=False)`

  

根据错误信息，现在的问题是在加载`en_normalizer`时，`cache_dir`参数的类型不正确。

在`NormalizerEn`的`init`中，`build_fst`方法尝试创建目录时，使用传入的`cache_dir`。

如果没有指定`cache_dir`，那么就会使用默认的缓存目录。

但是，如果默认的缓存目录是`MultiplexedPath`类型，就会有问题。

  

我们可以修改为：

`self.en_normalizer = NormalizerEn(overwrite_cache=False, cache_dir=cache_dir)`