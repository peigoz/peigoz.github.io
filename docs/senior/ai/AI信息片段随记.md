---
title: AI信息片段随记（持续更新中...）
date: 2025-08-19 23:47:15
tags:
  - AI
isShowComments: true
publish: true
---

- 意图检测模型：jev（闭源）、laya（开源）
- 国外主流通用模型：Gemini、Claude、ChatGPT、Grok
- 国内主流通用模型：DeepSeek、Qwen、GLM、Kimi、Hy4、MiniMax、Mimo、Seed、
- 向量模型：nomic-embed-text（非中文）、gte-large-zh、bge-large-zh-v1.5、m3e-base、tao8k
- 搜索引擎 SaaS 服务：serper.dev
- 本地可以用 ollama，企业部署一般使用 vllm。
- 工作流： dify、coze、n8n 等智能体工作流平台
- AI 绘图领域：Stable Diffusion、 Black Forest Labs 团队的 FLUX 、智谱清言的 CogView 模型以及快手的可灵 AI
- 语音合成：火山引擎
- 视觉合成：Kimi 视觉模型、 字节即梦 AI
- 语音识别：Azure
- 海外文件存储和 CDN：Bunny.net

## 中文向量模型

TOP@n 表示前 n 个结果中相关检索的正确性：  
![中文向量模型对比](https://blog.peigo.top/peigo/2025-08-19-23-49-01.png)

## 常用 API 服务

- DeepSeek：[https://platform.deepseek.com/](https://platform.deepseek.com/)  
- Flux：[https://api.us1.bfl.ai/](https://api.us1.bfl.ai/)  
- 可灵：[https://klingai.kuaishou.com/](https://klingai.kuaishou.com/)  
- Kimi：[https://platform.moonshot.cn/](https://platform.moonshot.cn/)  
- serper：[serper.dev](https://serper.dev/)  
- Azure：[https://portal.azure.com](https://portal.azure.com/#home)  
- Coze: <https://www.coze.cn/>  
- Bunny：[https://bunny.net/](https://bunny.net/)

## 常用业务组件

- 图数据库：Neo4j
- 向量数据库：Milvus
- 关系型数据库：Mysql、PostgreSql
- 全文检索数据库：ElasticSearch
- 缓存中间件：Redis
- 对象存储： Minio、RustFS
- 消息队列：RabbitMQ

## 相关框架

- Agent 全链路检测方案：LangSmith、LangFuse、OpenTelemetry.
![Agent全链路检测方案](https://blog.peigo.top/peigo/2026-09-19-19-01-41.png)
