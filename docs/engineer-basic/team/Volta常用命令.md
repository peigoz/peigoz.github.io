---
title: Volta常用命令
date: 2023-10-24 23:57:12
tags:
 - 代码协同
publish: true
---

## 介绍

1. Volta 与 nvm、fnm 等工具一样，是一个用 Rust 编写的 Node 版本管理工具，具有跨平台、快速、安全、易于使用等特性，但是 Volta 可以根据不同的项目无感知地自动切换 Node 版本（通过 **volta pin** 命令）。

## 常用命令

1. 下载 node：**volta install node@version**

2. 卸载：**volta uninstall node@version**

3. 查看安装过的 node 版本： **volta list node**

4. 切换版本 ： **volta pin node@version**

5. 将 node-version 文件中指定的 Node 版本与项目关联：**volta pin node@$(cat node-version)**
