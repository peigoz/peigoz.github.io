---
title: 工作中常见的Git命令
date: 2023-03-16 00:08:50
tags:
 - 代码协同
publish: true
---

### 查看远程分支

`git branch -a`

### 删除远程分支

`git push origin --delete <branchName>`

### 暂存代码切分支或者拉取代码

`git stash`

### 无merge记录拉取远程代码

##### 方法一

`git pull --rebase`

##### 方法二

`git stash && git pull && git stash pop`

### 更换仓库地址

##### 方法一

```git
git remote -v  #查看远端地址
git remote #查看远端仓库名
git remote set-url origin https://gitee.com/xx/xx.git (新地址)
```

##### 方法二

```
git remote rm origin #删除远程的仓库
git remote add origin  https://gitee.com/xx/xx.git(新地址) #重新添加远程仓库
```

### 合并指定commit

##### 合并单个commit

```git
git cherry-pick XXX(commit) #单独合并某个commit
```

##### 合并多个commit

```git
git cherry-pick AAA..BBB #合并 (AAA,BBB] 区间的commit记录,不包括AAA

git cherry-pick --continue #合并过程出现冲突会中断,解完冲突后需要使用--continue继续合并
```

### 取消rebase过程

```git
git rebase --abort
```

### 误删分支或记录

```
git reflog #查看删除记录
git reset --hard XXX #切到当时的分支
git cherry-pick XXX #找回删除的提交记录
```

### 其他Tips

#### 使用**rimraf**卸载`node_modules`文件

1. 安装 `npm i -g rimraf`

```json
// package.json
{
    "scripts": {
         "reset": "rimraf node_modules package-lock.json yarn.lock && npm i"
     }
}
  ```

#### 工具[ni](https://github.com/antfu/ni)

1. 会自动识别目前项目使用的npm工具(npm、yarn、pnpm)并替换为对应命令
2. 安装`npm i -g @antfu/ni`

```json
// ni - install
ni

# npm install
# yarn install
# pnpm install
# bun install
```

#### npm ci

1. 使用 npm ci 代替 npm install，这将强制执行 lockfile，避免它与 package.json 文件之间的不一致会导致错误

#### yarn pnpm

1. 使用pnpm(yarn) import 自动从现有的npm安装node_modules文件夹生成pnpm(yarn).lock,尽可能最大限度地减少lockfile与现有依赖关系树之间的差异

#### git alias

1. window: git的安装目录下的etc/profile.d，在aliases.sh文件最后面加入以下即可(可根据自己需要自行更改)。
2. 效果: 输入 gp 相当于 git pull

```bash
alias g='git'
alias gpr='git pull --rebase'
alias gp='git push'
alias gb='git branch'
alias gba='git branch -a'
alias gco='git commit'
alias gcom='git commit -m'
alias gc='git checkout'
alias gl='git log'
alias gcd='git checkout dev'
alias gcm='git checkout master'
alias gd='git diff'
alias gsh='git stash'
alias gshp='git stash pop'
alias gst='git status'
alias gm='git merge'
alias gmd='git merge dev'
alias gcld='git clone --depth 1'
```

#### gitconfig

1. gitconfig文件位置: C:\Users\用户名\.gitconfig。加入下列配置
2. 效果: 可以美化git log输出

```bash
[alias]
  p = pull
  pr = pull --rebase
  lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
