---
title: git
categories: 常用命令
tags:
---
# git

## 推送本地项目到远程仓库  

```bash
git init 
git add .
git commit -m "first_commit"
git remote add origin <远程仓库地址>
git push -u origin "main"
```

## 查看远程地址别名及路径

```bash
git remote -v  
```

## 重新设置远程仓库

```bash
git remote set-url origin <远程仓库地址>
```

## 更新 `.gitignore`

```bash
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

## 查看工作区、暂存区的状态（哪些文件被修改/未跟踪）

```bash
git status
```

## 分支管理

查看本地分支列表，`-a` 查看所有分支（含远程）

```bash
git branch
```

创建新分支

```bash
git branch <分支名>
```

切换到指定分支（`switch` 是更直观的新命令）

```bash
git checkout <分支名>
或
git switch <分支名>
```

  创建并切换到新分支。
  
```bash
git checkout -b <新分支名>
或
git switch -c <新分支名>
```

将指定分支合并到当前分支

```bash
git merge <分支名>
```

将当前分支的提交变基到目标分支

```bash
git rebase <分支名>
```

删除本地分支；`-D` 强制删除未合并的分支。

```bash
git branch -d <分支名>
```



```bash

```



```bash

```