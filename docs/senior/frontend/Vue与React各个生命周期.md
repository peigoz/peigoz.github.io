---
title: Vue与React各个生命周期
date: 2021-04-23 00:41:34
tags:
  - WebFramework
isShowComments: true
publish: true
---

## vue3.x 与 2.x 版本生命周期相对应的组合式 API

```text
1. beforeCreate -> 使用 setup()
2. created -> 使用 setup()
3. beforeMount -> onBeforeMount
4. mounted -> onMounted
5. beforeUpdate -> onBeforeUpdate
6. updated -> onUpdated
7. beforeDestroy -> onBeforeUnmount
8. destroyed -> onUnmounted
9. errorCaptured -> onErrorCaptured
```

## 新增的钩子函数

```text
1. onRenderTracked
2. onRenderTriggered
```

## 顺序

1. 3.0 中的生命周期 API 要比 2.0 中的先执行

## 与 react 对比

```text
1. componentWillMount
2. componentDidMount
3. shouldComponentUpdate
4. componentWillUpdate -> getSnapshotBeforeUpdate
5. componentDidUpdate
6. componentWillReceiveProps -> getDerivedStateFromProps
7. componentWillUnMount
```
