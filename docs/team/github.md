---
title: GitHub搜索技巧
date: 2020-04-20 14:09:48
categories:
  - 团队协作
tags:
  - Github
publish: true
---

<!-- more -->

### 按照项目名/仓库名搜索（大小写不敏感）

```sh
in:name xxx
```

### 按照 README 搜索（大小写不敏感）

```sh
in:readme xxx
```

### 按照 description 搜索（大小写不敏感）

```sh
in:description xxx
```

### stars 数大于 xxx

```sh
stars:>xxx
```

### forks 数大于 xxx

```sh
forks:>xxx
```

### 编程语言为 xxx

```sh
language:xxx
```

### 最新更新时间晚于 YYYY-MM-DD

```sh
pushed:>YYYY-MM-DD
```

### tips:多项匹配之间用空格隔开，如

```sh
//表示搜索项目名称包含商城，stars星数量要大于500，且使用js编写
in:name 商城 stars:>500 language:javascript
```
