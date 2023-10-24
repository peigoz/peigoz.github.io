---
title: Volta常用命令
date: 2023-10-24 23:57:12
categories:
 - Volta
tags:
 - Node
 - Volta
isShowComments: true
publish: true
---

## 介绍

1. Volta与nvm、fnm等工具一样，是一个用Rust编写的Node版本管理工具，具有跨平台、快速、安全、易于使用等特性，但是Volta可以根据不同的项目无感知地自动切换Node版本(通过 **volta pin** 命令)。

## 常用命令

1. 下载node：**volta install node@version**

2. 卸载：**volta uninstall node@version**

3. 查看安装过的node版本： **volta list node**

4. 切换版本 ： **volta pin node@version**

5. 将 node-version 文件中指定的 Node 版本与项目关联：**volta pin node@$(cat node-version)**
