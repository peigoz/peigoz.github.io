---
title: Redis 常用数据结构和应用场景
date: 2026-09-19 19:26:26
tags:
  - 后端
  - Redis
isShowComments: true
publish: true
---

## 1. String

1. 最基础的二进制安全字符串类型，可存储文本、整数、浮点数甚至二进制数据，底层采用动态字符串实现，支持原子自增自减和位操作，单次读写命令简单高效。
2. 使用场景：
   - 缓存：存储热点数据、会话信息、页面片段
   - 计数器：点赞数、访问量、库存扣减（INCR/DECR）
   - 分布式锁：SETNX + 过期时间实现互斥锁
   - 限流：INCR + EXPIRE 实现滑动窗口限流
3. 常用操作：

| 命令 | 说明 | 示例 |
| ------ | ------ | ------ |
| **SET** key value | 设置键值对 | SET name "tom" |
| **GET** key | 获取键对应的值 | GET name |
| **SETNX** key value | 仅当键不存在时设置值（常用于分布式锁） | SETNX lock:order 1 |
| **SETEX** key seconds value | 设置值并指定过期时间（秒） | SETEX code 60 "1234" |
| **MSET** key value [key value ...] | 批量设置多个键值对 | MSET name "tom" age 18 |
| **MGET** key [key ...] | 批量获取多个键的值 | MGET name age |
| **INCR** key | 整数值自增 1 | INCR views |
| **INCRBY** key increment | 整数值增加指定数值 | INCRBY views 10 |
| **DECR** key | 整数值自减 1 | DECR stock |
| **DECRBY** key decrement | 整数值减少指定数值 | DECRBY stock 5 |
| **INCRBYFLOAT** key increment | 浮点数增加指定数值 | INCRBYFLOAT price 0.5 |
| **APPEND** key value | 追加字符串到值末尾 | APPEND name "cy" |
| **STRLEN** key | 获取值的字符串长度 | STRLEN name |
| **DEL** key [key ...] | 删除指定键 | DEL name |
| **EXPIRE** key seconds | 设置键的过期时间（秒） | EXPIRE name 60 |
| **SET** key value EX seconds | 在 SET 时同时设置过期 | SET name "tom" EX 60 |
| **TTL** key | 查看键的剩余过期时间 | TTL name |

## 2. Hash

1. 字符串字段与字符串值之间的映射容器，底层根据数据量在压缩列表和哈希表之间自动切换编码，可对单个字段进行独立的读写、删除和原子增减，内存布局紧凑且操作粒度细。
2. 使用场景：
   - 存储对象：用户信息、商品详情、配置项
   - 购物车：购物车商品数量表存储、购物车操作（添加商品、增加数量、商品总数、删除商品、获取购物车所有商品）
   - 缓存数据库记录：避免序列化/反序列化开销，可单独修改某个字段
   - 配置中心：修改配置时直接 HSET 对应 field，客户端可定期轮询或通过 Pub/Sub 感知变化。
   - Session 管理：保存用户会话信息，如登录状态、token、过期时间等，以 sessionId 为 key，多个属性为 field。
   - 在线用户属性统计：记录每个在线用户的登录时间、IP、设备类型，字段实时更新。
3. 常用操作：

| 命令 | 说明 | 示例 |
| ------ | ------ | ------ |
| **HSET** key field value [field value ...] | 设置一个或多个字段的值 | HSET user:1 name "tom" age 18 |
| **HGET** key field | 获取指定字段的值 | HGET user:1 name |
| **HGETALL** key | 获取所有字段和值（如获取购物车所有商品） | HGETALL cart:1001 |
| **HMGET** key field [field ...] | 批量获取多个字段的值 | HMGET user:1 name age |
| **HSETNX** key field value | 仅当字段不存在时设置值 | HSETNX user:1 name "tom" |
| **HINCRBY** key field increment | 字段整数值自增（如购物车商品数量加 1） | HINCRBY cart:1001 goods:1 1 |
| **HINCRBYFLOAT** key field increment | 字段浮点数值增加 | HINCRBYFLOAT user:1 balance 0.5 |
| **HLEN** key | 获取字段数量（如购物车商品总数） | HLEN cart:1001 |
| **HDEL** key field [field ...] | 删除一个或多个字段（如购物车移除商品） | HDEL cart:1001 goods:1 |
| **HEXISTS** key field | 判断字段是否存在 | HEXISTS user:1 name |

## 3. List

1. 有序、可重复的双向链表结构，底层由快速链表或压缩节点组成，支持从左右两端以 O(1) 复杂度压入和弹出元素，也支持按索引范围切割与阻塞式弹出。
2. 使用场景：
    - 消息队列：LPUSH + BRPOP 实现简单的生产消费者模式
    - 时间线/Feed 流：存储用户最新动态
    - 最新列表：如新闻、日志，用 LRANGE 分页
    - 任务队列：异步任务调度
3. 常用操作：

| 命令 | 说明 | 示例 |
| ------ | ------ | ------ |
| **LPUSH** key element [element ...] | 从左侧（头部）插入一个或多个元素 | LPUSH queue:email task:1 |
| **RPUSH** key element [element ...] | 从右侧（尾部）插入一个或多个元素 | RPUSH feed:1001 msg:5 |
| **LPOP** key | 从左侧（头部）弹出元素 | LPOP queue:email |
| **RPOP** key | 从右侧（尾部）弹出元素 | RPOP feed:1001 |
| **BRPOP** key [key ...] timeout | 阻塞式从右侧弹出，无元素时等待（消息队列） | BRPOP queue:email 0 |
| **LRANGE** key start stop | 获取指定范围的元素（如列表分页） | LRANGE feed:1001 0 9 |
| **LLEN** key | 获取列表长度 | LLEN queue:email |
| **LINDEX** key index | 获取指定下标的元素 | LINDEX feed:1001 0 |
| **LREM** key count element | 移除指定值的元素 | LREM feed:1001 1 msg:5 |
| **LTRIM** key start stop | 只保留指定范围的元素（如只保留最新 100 条） | LTRIM feed:1001 0 99 |

## 4. Set

1. 无序、去重的字符串集合，底层在元素全为整数且规模较小时使用整数集合，否则转为哈希表，支持 O(1) 级别的增删改查，并内置交集、并集、差集等高效集合运算。
2. 使用场景：
    - 标签系统：给文章/用户打标签，做交集/并集/差集运算
    - 去重统计：UV 统计、IP 黑白名单
    - 共同好友：SINTER 计算好友交集
    - 随机抽奖：SRANDMEMBER 随机取元素
3. 常用操作：

| 命令 | 说明 | 示例 |
| ------ | ------ | ------ |
| **SADD** key member [member ...] | 添加一个或多个元素 | SADD tag:vue article:1 |
| **SREM** key member [member ...] | 删除一个或多个元素 | SREM tag:vue article:1 |
| **SMEMBERS** key | 获取集合中所有元素 | SMEMBERS tag:vue |
| **SISMEMBER** key member | 判断元素是否存在于集合中 | SISMEMBER blacklist:ip "1.2.3.4" |
| **SCARD** key | 获取集合元素数量 | SCARD tag:vue |
| **SINTER** key [key ...] | 交集（如共同好友、共同标签） | SINTER friends:tom friends:jerry |
| **SUNION** key [key ...] | 并集 | SUNION friends:tom friends:jerry |
| **SDIFF** key [key ...] | 差集（如我关注的人中他未关注的） | SDIFF follow:tom follow:jerry |
| **SRANDMEMBER** key [count] | 随机返回元素（如抽奖） | SRANDMEMBER lottery:users 3 |
| **SPOP** key [count] | 随机移除并返回元素 | SPOP lottery:users |

## 5. ZSet

1. 带分数（score）的有序去重集合，底层结合哈希表和跳跃表实现，兼顾 O(1) 的按成员查找与 O(logN) 的按分数排序、范围查询和排名计算。
2. 使用场景：
    - 排行榜：积分排名、游戏排行（按分数排序）
    - 延迟队列：用时间戳作为分数，轮询 ZRANGEBYSCORE 获取到期任务
    - 滑动窗口限流：以时间戳为分数，记录每次请求，统计窗口内数量
    - 优先级队列：分数作为优先级，高优先级先出
3. 常用操作：

| 命令 | 说明 | 示例 |
| ------ | ------ | ------ |
| **ZADD** key score member [score member ...] | 添加元素并设置分数 | ZADD rank:score 100 tom |
| **ZSCORE** key member | 获取元素的分数 | ZSCORE rank:score tom |
| **ZINCRBY** key increment member | 增加元素的分数 | ZINCRBY rank:score 10 tom |
| **ZREVRANK** key member | 按分数降序获取元素排名（如排行榜名次） | ZREVRANK rank:score tom |
| **ZREVRANGE** key start stop [WITHSCORES] | 按分数降序获取元素（如 Top 10） | ZREVRANGE rank:score 0 9 WITHSCORES |
| **ZRANGE** key start stop [WITHSCORES] | 按下标或分数范围获取元素 | ZRANGE rank:score 0 9 WITHSCORES |
| **ZRANGEBYSCORE** key min max [WITHSCORES] [LIMIT offset count] | 按分数区间获取元素（如延迟队列取到期任务） | ZRANGEBYSCORE delay:queue 0 1789000000 |
| **ZCOUNT** key min max | 统计分数区间内的元素数量（如滑动窗口限流） | ZCOUNT rate:ip 1788999940 1789000000 |
| **ZCARD** key | 获取元素数量 | ZCARD rank:score |
| **ZREM** key member [member ...] | 删除一个或多个元素 | ZREM rank:score tom |

## 6. Bitmap

1. 不是独立类型，基于 String 类型按位操作的位图结构，每个 bit 表示一个状态，支持对位进行设置、读取、计数和位运算，内存占用极为紧凑，适合大规模布尔标记。
2. 使用场景：
    - 签到/打卡：每个用户一年 365 天只需 46 个字节
    - 在线状态：记录用户是否在线，BITOP 求活跃用户
    - 布隆过滤器：快速判断元素是否存在
3. 常用操作：

| 命令 | 说明 | 示例 |
| ------ | ------ | ------ |
| **SETBIT** key offset value | 设置指定偏移量上的位值 | SETBIT sign:1001:202609 18 1 |
| **GETBIT** key offset | 获取指定偏移量上的位值 | GETBIT sign:1001:202609 18 |
| **BITCOUNT** key [start end] | 统计值为 1 的位数（如当月签到天数） | BITCOUNT sign:1001:202609 |
| **BITPOS** key bit [start] [end] | 查找第一个为 0 或 1 的位 | BITPOS sign:1001:202609 1 |
| **BITOP** operation destkey key [key ...] | 对多个 Bitmap 做位运算（如求活跃用户） | BITOP OR active:202609 active:0918 active:0919 |

## 7. HyperLogLog

1. 基于概率算法实现的基数估算结构，底层使用固定大小的寄存器数组，以约 12KB 内存估算海量数据中去重元素的数量，误差约为 0.81%，并支持合并多个统计结果。
2. 使用场景：
    - UV 统计：千万级用户量仅占用 12KB 内存
    - 搜索关键词去重计数：统计独立 IP、独立访客
3. 常用操作：

| 命令 | 说明 | 示例 |
| ------ | ------ | ------ |
| **PFADD** key [element ...] | 添加元素用于估算计数 | PFADD uv:page:home "user:1001" |
| **PFCOUNT** key [key ...] | 估算去重后的元素数量（如 UV） | PFCOUNT uv:page:home |
| **PFMERGE** destkey sourcekey [sourcekey ...] | 合并多个 HyperLogLog（如多页面总 UV） | PFMERGE uv:total uv:page:home uv:page:detail |

## 8. GEO

1. 基于 ZSet 实现的地理位置索引结构，将经纬度编码为分数存储，并提供距离计算、范围搜索和坐标转换等命令，底层利用有序集合的排序能力快速定位地理对象。
2. 使用场景：
    - 附近的人/门店：GEORADIUS 查找附近地点
    - 配送调度：计算配送距离和范围
    - 地图应用：位置标记、范围查询
3. 常用操作：

| 命令 | 说明 | 示例 |
| ------ | ------ | ------ |
| **GEOADD** key longitude latitude member [longitude latitude member ...] | 添加地理位置（经度、纬度、名称） | GEOADD stores 116.48 39.99 "store:1" |
| **GEOPOS** key member [member ...] | 获取指定位置的经纬度 | GEOPOS stores "store:1" |
| **GEODIST** key member1 member2 [unit] | 计算两个位置间的距离 | GEODIST stores "store:1" "store:2" km |
| **GEORADIUS** key longitude latitude radius unit | 查找指定坐标范围内的位置（附近的人/门店） | GEORADIUS stores 116.48 39.99 10 km |
| **GEORADIUSBYMEMBER** key member radius unit | 查找某成员指定范围内的位置 | GEORADIUSBYMEMBER stores "store:1" 10 km |
| **GEOSEARCH** key FROMMEMBER member BYRADIUS radius unit | 按坐标或成员搜索附近位置（GEORADIUS 的新替代命令） | GEOSEARCH stores FROMMEMBER "store:1" BYRADIUS 10 km ASC |

## 总结

1. 简单 KV 缓存 → String​  
    适合纯键值对、计数器、限流、分布式锁，支持原子自增自减和过期时间，是最通用、最基础的选择。
2. 对象存储且需局部更新 → Hash​  
    适合用户资料、商品详情等结构化对象，能单独读写和修改某个字段，不用整体序列化，修改成本低。
3. 需要顺序或队列 → List​  
    适合消息队列、时间线、最新动态，支持从两端高效压入/弹出，还能阻塞等待，天然契合生产者消费者模式。
4. 去重或集合运算 → Set​  
    适合标签体系、共同好友、黑白名单等，天然去重，并支持交集、并集、差集运算，做关系筛选很高效。
5. 排序需求 → ZSet​  
    适合排行榜、延时队列、优先级任务，每个元素带分数，既能按分数排序又能按分数范围快速查询。
6. 位图状态 → Bitmap​  
    适合大量布尔型标记，如签到、在线状态、连续活跃天数，每个状态仅占 1 bit，空间极省。
7. 大基数去重 → HyperLogLog​  
    适合海量 UV / IP 统计，用极小内存估算去重总数，不追求精确、只求量级时非常划算。
8. 地理查询 → GEO​  
    适合附近的人、门店距离等场景，底层封装经纬度存储和距离计算，开箱即用。
