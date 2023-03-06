---
title: git rebase 与 git merge 区别
date: 2022-05-22 02:45:44
categories:
  - 团队协作
tags:
  - Git
isShowComments: true
publish: true
---

## git-flow 简单说明

## 场景

![场景说明](https://blog.peigo.top/peigo/2022-05-24-23-43-12.png)

1. 线上的开发分支为 origin/dev 此时项目进度为 a

2. 张三和李四都基于此时切出去 dev-1 和 dev-2

3. 张三开发了 b 功能,李四开发了 c 功能,李四在张三前先提交了 c 至仓库(origin/dev a、c）,此时张三应该走的一个 git 流程。

## 多路合并和快速前进的区别

## 多余的合并记录,多路合并

1. 张三开发完 b 功能后,此时他的本地 dev 分支还处于只有 a 功能的时代,远程 dev 分支已经处于 a、c 时代,此时 A 执行了以下操作:

   1. 切换本地 dev 分支执行`git pull`将本地更新至 ac
   2. 切换本地 dev-1 分支执行`git merge dev`,此时分支情况：dev 分支有 ac,dev-1 有 ab,存在冲突情况,解完冲突后提交至远程 origin/dev-1 分支
   3. 创建合并请求合并至 origin/dev

2. merge 后的 commit 记录： ![多路合并commit记录](https://blog.peigo.top/peigo/2022-05-24-23-42-37.png)

3. 解完冲突后执行`git log` 会发现此时 commit 记录多出了上面的这种信息,然而这种消息记录在实际上并没有太大作用,反而会干扰整个 commit 记录

## 没有 merge 记录的合并,快速前进 Fast-forword

1. 假设张三开发完 b 功能时,李四还没有开发完 c,张三处于领先情况,此时张三同样执行了上面的操作：

   1. 切换本地 dev 分支执行`git pull`，发现本地还是 a,没有更新记录
   2. 切换本地 dev-1 分支执行 git merge dev,此时分支情况：dev 分支有 a,dev-1 有 ab,**不存在冲突情况**,dev-1 处于**在 a 的基础上再开发新功能领先于 dev**的时代。merge 完提交至远程 origin/dev-1 分支
   3. 创建合并请求合并至 origin/dev

2. 这是整个 merge 流程情况：

   1. 本地 dev(图例是 delete）执行 merge 前 dev 的 commit 记录：  
      ![merge前本地dev的commit记录](https://blog.peigo.top/peigo/2022-05-24-23-47-15.png)
   2. 执行 merge 前 dev-1 的 commit 记录：  
      ![merge前dev-1的commit记录](https://blog.peigo.top/peigo/2022-05-24-23-47-46.png)
   3. 执行 merge 时会发现提示 Fast-forword 信息,表示这是一个快路合并,不存在冲突：  
      ![执行merge的提示](https://blog.peigo.top/peigo/2022-05-24-23-48-21.png)
   4. 执行 merge 后 dev 和 dev-1 的 commit 记录：  
      ![执行merge后的dev和dev-1的commit记录](https://blog.peigo.top/peigo/2022-05-24-23-48-39.png)

3. 我们会发现多出了一条快路合并的 commit 信息(b 功能）,且没有第一种情况那个 merge 记录信息

## 利用快路合并的特点在开头场景下屏蔽掉那些 merge 信息

## 使用 git rebase 替代直接 merge

1. 在张三要提交 b 功能前,此时分支情况: 本地 dev 有 a,远程 origin/dev 有 a、c,本地 dev-1 有 a、b
2. 那么我们应该执行一下流程：
   1. 切换至本地 dev 分支,执行`git pull`(也可以分开使用`git fetch`和`git merge`这个我自己也没用过,貌似比直接`git pull`会稳定,具体可自行了解),将本地 dev 更新至 a、b
   2. 切换回本地 dev-1,执行`git rebase dev`变基**使 dev-1 上的 b 功能成为基于 a、c 的基础上而开发新功能**,在 rebase 的过程中也许会出现冲突(conflict),在这种情况,Git 会停止 rebase 并会让你去解决 冲突,解完冲突后在解决完冲突后，用`git add`命令去更新这些内容的索引(index), 然后，无需执行 `git commit`,只要执行`git rebase --continue`这样 git 会继续应用(apply)余下的补丁(假如你的 dev-1 有多个 commit 记录且都和此时的 dev 有冲突)
   3. 更新至远程 origin/dev-1 分支(此时远程可能和变基后的本地 dev-1 有冲突,以本地变基整理后的结果为准,直接使用`git push -f`覆盖远程记录),并创建合并请求合并至 origin/dev

## commit 的原子性

1. 一个需求做到一半需要拉线上的代码同步的话，可以使用`git stash`放入本地缓存区，通过`git stash pop`或者`git stash apply XXX`恢复。不要用 commit。如果要用 commit，后面关于这个需求的 commit 就要整理成一个 commit 推上去再提 mr。整个流程最好保持一个需求一个 commit。
2. 可使用`git commit --amend`沿用上一个 commit
3. 如果已经出现了一个 feat 多个 commit 的话（前面没有用 commit --amend），还可以用 git rebase -i 去压缩（合并）若干个 commit 为一个 commit。

## git stash

1. `git stash list` 查看缓存列表
2. `git stash drop XXX` 移除特定 stash
3. `git stash save "XXX"` 添加 stash 说明
