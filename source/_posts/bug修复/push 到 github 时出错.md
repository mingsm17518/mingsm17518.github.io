---
title: push 到 github 时出错
categories: bug修复
tags:
---
push 到 github 时出错：

```bash
fatal: unable to access ‘https://github.com/…/.git‘: Could not resolve host: github.com
```

编辑`C:\Windows\System32\drivers\etc\`下的`hosts`文件，在末尾添加：

```txt
140.82.113.3 github.com
```

`140.82.113.3` 是 github 的 IP 地址，可以在[https://www.ipaddress.com/website/www.github.com](https://www.ipaddress.com/website/www.github.com)获取到最新地址。