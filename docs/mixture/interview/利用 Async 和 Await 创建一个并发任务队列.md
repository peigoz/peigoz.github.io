---
title: 利用 Async 和 Await 创建一个并发任务队列
date: 2026-09-03 03:24:21
tags:
  - 面试
isShowComments: true
publish: true
---

```js
class TaskQueue {
  constructor(concurrency) {
    this.taskQueue = [];
    this.consumerQueue = [];

    // 初始化消费者
    for (let i = 0; i < concurrency; i++) {
      this.consumer();
    }
  }

  // 消费者
  async consumer() {
    try {
      while (true) {
        const task = await this.getNextTask();
        await task();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getNextTask() {
    return new Promise((resolve) => {
      if (this.taskQueue.length !== 0) {
        resolve(this.taskQueue.shift());
      } else {
        this.consumerQueue.push(resolve);
      }
    });
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        const taskPromise = task();

        taskPromise.then(resolve, reject);
        return taskPromise;
      };

      if (this.consumerQueue.length !== 0) {
        const consumer = this.consumerQueue.shift();
        consumer(taskWrapper);
      } else {
        this.taskQueue.push(taskWrapper);
      }
    });
  }
}

let run = 1;

// 模拟网络请求
function fetchFn(res) {
  setTimeout(() => {
    res(run++);
  }, 10);
}
const tasks = Array(1000)
  .fill(fetchFn)
  .map((fn) => () => new Promise(fn));
const taskQueue = new TaskQueuePC(5);

Promise.all(tasks.map((task) => taskQueue.runTask(task)))
  .then((res) => {
    console.log("is run all task", res);
  })
  .catch((rej) => {
    console.log("task run err", rej);
  });
```
