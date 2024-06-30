---
title: 迭代法和递归法实现二叉树的DFS
date: 2023-05-17 01:11:38
tags:
 - 数据结构与算法
publish: true
---

## 递归法

### 1. 前序遍历

```js
const preorderTraversal = function(root) {
 let res=[];
 const dfs=function(root){
     if(root===null)return ;
     //处理中间节点
     res.push(root.val);
     //递归左子树
     dfs(root.left);
     //递归右子树
     dfs(root.right);
 }
 dfs(root);
 return res;
};
```

### 2.中序遍历

```js
const inorderTraversal = function(root) {
 let res=[];
 const dfs=function(root){
     if(root===null)return ;
     //递归左子树
     dfs(root.left);
     //处理中间节点
     res.push(root.val);
     //递归右子树
     dfs(root.right);
 }
 dfs(root);
 return res;
};
```

### 3.后序遍历

```js
const postorderTraversal = function(root) {
 let res=[];
 const dfs=function(root){
     if(root===null)return ;
     //递归左子树
     dfs(root.left);
     //递归右子树
     dfs(root.right);
     //处理中间节点
     res.push(root.val);
 }
 dfs(root);
 return res;
};
```

## 迭代法(利用栈和标记节点)

### 前序遍历

```js
const preorderTraversal = function(root, res = []) {
    const stack = [];
    if (root) stack.push(root);
    while(stack.length) {
        const node = stack.pop();
        if(!node) {
          // null节点标记，下一个为中间节点，处理
            res.push(stack.pop().val);
            continue;
        }
        if (node.right) stack.push(node.right); // 右
        if (node.left) stack.push(node.left); // 左
        stack.push(node); // 中
        stack.push(null); // 标记节点
    };
    return res;
};
```

### 中序遍历

```js
const inorderTraversal = function(root, res = []) {
    const stack = [];
    if (root) stack.push(root);
    while(stack.length) {
        const node = stack.pop();
        if(!node) {
          // null节点标记，下一个为中间节点，处理
            res.push(stack.pop().val);
            continue;
        }
        if (node.right) stack.push(node.right); // 右
        stack.push(node); // 中
        stack.push(null);
        if (node.left) stack.push(node.left); // 左
    };
    return res;
};
```

### 后序遍历

```js
const postorderTraversal = function(root, res = []) {
    const stack = [];
    if (root) stack.push(root);
    while(stack.length) {
        const node = stack.pop();
        if(!node) {
          // null节点标记，下一个为中间节点，处理
            res.push(stack.pop().val);
            continue;
        }
        stack.push(node); // 中
        stack.push(null);
        if (node.right) stack.push(node.right); // 右
        if (node.left) stack.push(node.left); // 左
    };
    return res;
};
```
