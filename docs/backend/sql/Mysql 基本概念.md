---
title: Mysql 基本概念
date: 2026-07-23 17:54:50
tags:
 - 数据库
isShowComments: true
publish: true
---

## 常用类型

### 整数类型

1. 极小整形：`TINYINT` 一个字节存储，有符号 -128 ~ 127，无符号 0 ~ 255，常用于状态、开关等小数值
2. 小整型：`SMALLINT` 两个字节存储，有符号 -32768 ~ 32767，无符号 0 ~ 65535
3. 中整型：`MEDIUMINT` 三个字节存储，有符号 -8388608 ~ 8388607，无符号 0 ~ 16777215
4. 整型：`INT`（别名 `INTEGER`）四个字节存储，有符号约 ±21 亿，无符号 0 ~ 42 亿，最常用的整数类型
5. 大整型：`BIGINT` 八个字节存储，有符号约 ±9.2 × 10^18，常用于主键、雪花 ID 等大数场景

### 小数类型

1. 单精度浮点：`FLOAT` 四个字节存储，近似值，存在精度丢失
2. 双精度浮点：`DOUBLE` 八个字节存储，近似值，精度高于 `FLOAT`
3. 定点小数：`DECIMAL(M, D)` 精确存储，M 为总位数（最大 65），D 为小数位数，适合金额等精度敏感场景

### 日期时间类型

1. 日期：`DATE` 三个字节存储，格式 `YYYY-MM-DD`，范围 1000-01-01 ~ 9999-12-31
2. 日期时间：`DATETIME` 八个字节存储，格式 `YYYY-MM-DD HH:MM:SS`，范围 1000 ~ 9999 年，不受时区影响
3. 时间戳：`TIMESTAMP` 四个字节存储，以 UTC 存储、查询时按时区转换，范围 1970 ~ 2038 年，受时区影响

### 字符串类型

 1. 定长字符串：`CHAR(M)`，M 为 0 ~ 255 个字符，不足自动补空格，读取时去掉尾部空格，适合长度固定的值（如 MD5）
 2. 变长字符串：`VARCHAR(M)`，M 为 0 ~ 65535（实际受行大小限制），按实际长度存储，最常用的字符串类型
 3. 文本类型：`TINYTEXT` / `TEXT` / `MEDIUMTEXT` / `LONGTEXT`，分别约 255B / 64KB / 16MB / 4GB，适合存储长文本
 4. 二进制类型：`BINARY` / `VARBINARY` / `BLOB`（含 `TINYBLOB` / `MEDIUMBLOB` / `LONGBLOB`），适合存储图片、文件等二进制数据
 5. 枚举类型：`ENUM('a', 'b', ...)` 单选，值只能是定义项之一，内部按整数存储
 6. 集合类型：`SET('a', 'b', ...)` 多选，值可以是定义项的任意组合

### 使用示例

```sql
create table tb_userInfo
(
  user_id     bigint unsigned primary key auto_increment COMMENT '用户 id',
  user_name   varchar(30) not null COMMENT '用户名',
  status      tinyint unsigned not null default 0 COMMENT '状态：0-正常 1-禁用',
  balance     decimal(10, 2) not null default 0.00 COMMENT '账户余额',
  avatar      varchar(255) default null COMMENT '头像地址',
  description text COMMENT '个人简介',
  created_at  datetime not null default current_timestamp COMMENT '创建时间',
  updated_at  timestamp not null default current_timestamp on update current_timestamp COMMENT '更新时间'
);
```

::: tip 选型建议

- 金额一律用 `DECIMAL`，避免 `FLOAT` / `DOUBLE` 的精度问题
- 主键推荐 `INT/BIGINT UNSIGNED`，防止数据量增长溢出
- 在满足需求的前提下尽量用小类型，减少存储与索引开销
- `TIMESTAMP` 只能表示到 2038 年且受时区影响，跨时区或长期存储建议用 `DATETIME`
:::

## 约束

1. 非空：`NOT NULL`
2. 非负： `UNSIGNED`
3. 主键：`PRIMARY KEY`
4. 自增：`AUTO_INCREMENT`
5. 默认值：`DEFAULT`
6. 注释：`COMMENT`

## 常用操作

### 数据库操作

```sql
-- 创建数据库（指定字符集与排序规则，避免中文乱码）
create database userdb default character set utf8mb4 collate utf8mb4_general_ci;

-- 如果数据库不存在才创建
create database if not exists userdb;

-- 使用（切换）数据库
use userdb;

-- 查看所有数据库
show databases;

-- 查看当前所在数据库
select database();

-- 查看建库语句
show create database userdb;

-- 删除数据库
drop database userdb;

-- 如果数据库存在即删除
drop database if exists userdb;
```

### 表操作

```sql
-- 创建表： `create table 表名（表字段名 类型 长度 <约束, 默认值, 注释> ）;`
create table tb_userInfo
(
  user_id integer(10) primary key auto_increment COMMENT '用户 id',
  user_name varchar(30) not null
);

-- 如果表存在即删除
drop table if exists tb_userInfo;

-- 查看当前库所有表
show tables;

-- 查看表结构
desc tb_userInfo;
show columns from tb_userInfo;

-- 查看建表语句
show create table tb_userInfo;

-- 修改表：新增字段
alter table tb_userInfo add column age tinyint unsigned default 0 COMMENT '年龄';

-- 修改表：修改字段类型（modify 不改变字段名，只能改类型和约束）
alter table tb_userInfo modify column user_name varchar(50) not null COMMENT '用户名';

-- 修改表：重命名字段（change 可同时改字段名与类型）
alter table tb_userInfo change column age user_age tinyint unsigned default 0 COMMENT '年龄';

-- 修改表：删除字段
alter table tb_userInfo drop column user_age;

-- 修改表：重命名表
rename table tb_userInfo to tb_user;

-- 清空表数据（保留表结构，可回滚，自增计数不重置）
delete from tb_userInfo;

-- 清空表数据（保留表结构，不可回滚，自增计数重置）
truncate table tb_userInfo;
```

### 数据操作（CRUD）

```sql
-- 插入：指定字段插入（推荐，字段顺序变化也不受影响）
insert into tb_userInfo (user_name) values ('张三');

-- 插入：一次插入多行
insert into tb_userInfo (user_name) values ('李四'), ('王五');

-- 插入：全字段插入（字段顺序需与表结构一致）
insert into tb_userInfo values (null, '赵六');

-- 查询：查询所有字段
select * from tb_userInfo;

-- 查询：指定字段并取别名
select user_id as id, user_name from tb_userInfo;

-- 查询：条件过滤。
-- 模糊匹配 like：占位符（_）、通配符（%）
-- 逻辑运算符：and 、 or
select * from tb_userInfo where user_id > 10 and user_name like '张%';

-- 区间 between and
select * from tb_userInfo where user_id between 3 and 7;

-- in 集合 
select * from tb_userInfo where user_id in (3,7);

-- union 合并结果，等同上面 in 的结果。
-- union all 返回未去重的结果，union 返回去重后的结果。
select * from tb_userInfo where user_id = 3
union all
select * from tb_userInfo where user_id = 7;

-- 查询：排序（asc 升序，可省略；desc 降序）
select * from tb_userInfo order by user_id desc;

-- 查询：分页（limit 下标, 条数）下标从 0 开始，即分页参数（(currentPage - 1) * pageSize, pageSize）。
-- currentPage：1，pageSize：10 时，从第 0 项开始检索 10 条数据（返回第 1-10 的数据）
select * from tb_userInfo limit 0, 10;

-- 查询：去重
select distinct user_name from tb_userInfo;

-- 更新：务必带上 where，否则会更新整张表
update tb_userInfo set user_name = '张三丰',user_age = 18 where user_id = 1;

-- 删除：务必带上 where，否则会删除整张表数据
delete from tb_userInfo where user_id = 1;
```

### 聚合与分组

```sql
-- 聚合函数：计数、求和、最大值、最小值、平均值
select count(user_id) 用户数量 from tb_userInfo;
select sum(balance), max(balance), min(balance), avg(balance) from tb_userInfo;

-- 分组：先按状态分组，再统计每组的数量
-- 注意：select 后的字段只能是分组字段或聚合函数（受 sql_mode 的 only_full_group_by 约束）
select status, count(*) as total from tb_userInfo group by status;

-- 分组后再过滤，需使用 having（where 在分组前执行，不能用聚合函数）
select status, count(*) as total from tb_userInfo group by status having total > 10;
-- 先 where 查询薪资大于 2w的数据，再按薪资分组，最后 having 对分组后的结果进行筛选， 显示数量大于0的组
select salary,count(*) from salary_tab where salary>=20000 group by salary having count(*)>=0;
```

### 多表关联

```sql
-- 内连接：只返回两表中匹配上的行
select u.user_id, u.user_name, o.order_no
from tb_user u
inner join tb_order o on u.user_id = o.user_id;
-- 等价写法
select u.use r_id, u.user_name, o.order_no from tb_user u, tb_order o where u.user_id = o.user_id;

-- 外连接
-- 左外连接：以左表为主，右表无匹配时补 null
select u.user_id, u.user_name, o.order_no
from tb_user u
left join tb_order o on u.user_id = o.user_id;

-- 右外连接：以右表为主，左表无匹配时补 null
select u.user_id, o.order_no
from tb_user u
right join tb_order o on u.user_id = o.user_id;

-- 中连接，查询左右表都存在 user_id 且相互关联的数据，未关联的都会过滤
select * FROM tb_user u JOIN tb_order o ON u.user_id = o.user_id;

-- 子查询：先查出满足条件的用户 id，再作为外层查询的过滤条件
select * from tb_order where user_id in (select user_id from tb_user where status = 0);
```

### 索引

```sql
-- 建表时创建普通索引
create table tb_order
(
  order_id bigint unsigned primary key auto_increment COMMENT '订单 id',
  user_id  bigint unsigned not null COMMENT '用户 id',
  index idx_user_id (user_id)
);

-- 建表后创建普通索引
create index idx_user_id on tb_order (user_id);

-- 创建唯一索引（值不可重复，允许多个 null）
create unique index uk_order_no on tb_order (order_no);

-- 创建联合索引（遵循最左前缀原则，如 (a, b, c) 可命中 a、a+b、a+b+c 的查询）
create index idx_user_status on tb_order (user_id, status);

-- 删除索引
drop index idx_user_id on tb_order;
alter table tb_order drop index idx_user_id;

-- 查看索引
show index from tb_order;

-- 查看执行计划（type、key、rows 等字段可判断是否走索引）
explain select * from tb_order where user_id = 1;
```

### 事务控制

```sql
-- 开启事务
begin;
-- 或
start transaction;

-- 提交事务，改动落库
commit;

-- 回滚事务，撤销本次事务内的所有改动
rollback;

-- 设置保存点并回滚到指定保存点（只回滚保存点之后的改动）
savepoint sp1;
rollback to sp1;
```

### 备份

```bash
# 导出整个userdb数据库。不带有原数据库名
mysqldump -h127.0.0.1 -uroot -p123456 userdb > userdb.sql 
# 导出整个userdb数据库。带有原数据库名
mysqldump -h127.0.0.1 -uroot -p123456 --databases userdb > userdb.sql 
# 导出多个数据库表
mysqldump -h127.0.0.1 -uroot -p123456 userdb tb_userInfo tb_order > userdb_tables.sql

# 导入数据库
mysql -h127.0.0.1 -uroot -p123456 userdb < userdb.sql
# 导入表
mysql -h127.0.0.1 -uroot -p123456 userdb < userdb_tables.sql
```
