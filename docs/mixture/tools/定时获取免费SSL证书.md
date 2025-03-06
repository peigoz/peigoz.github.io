---
title: 定时获取免费SSL证书部署至七牛云
date: 2025-03-06 17:37:27
tags:
 - SSL
isShowComments: true
publish: true
---

## 背景

1. 笔者的博客是通过 vitepress 搭建并通过 gitActions 免费部署至 gitHub Pages 的，
同时申请了自己的域名作为自定义域名解析至 gitHub Pages。
故没有自己的云主机（以前有，后面没续费），所以使用了七牛云作为图床，
因为博客接入了 https，所以需要一个免费的 SSL 证书。以前使用的是域名商自带的免费一年 SSL 证书，最近过期想重新申请时发现现在免费证书最多只能申请 3 个月的了，想到每隔 3 个月都要换一次，觉得有点麻烦，故有了这篇文章。

## 步骤分析

1. 利用 `acme.sh` 自动申请免费 SSL 证书，因为域名是通过腾讯云解析的（其他厂商同理）。这里参考腾讯云的文档，[acme.sh 自动解析并申请证书](https://cloud.tencent.com/document/product/302/105900)。
2. 申请成功后，我需要将证书部署至七牛云用来做图床域名，这里参考[acme的部署文档](https://github.com/acmesh-official/acme.sh/wiki/deployhooks).
3. 将部署任务自动化，因为没有云主机，所以这里将脚本通过 Mac 的定时任务实现，这里参考[Mac 定时任务](https://developer.aliyun.com/article/970774)。
4. 自动替换最新证书，[域名API文档](https://developer.qiniu.com/fusion/4246/the-domain-name#14)。

## 步骤实现

1. 下载 `acme.sh` 脚本

    ```shell
    curl https://get.acme.sh | sh -s email=my@example.com // 你的邮箱
    ```

2. 生成证书

    ```shell
    export Tencent_SecretId="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    export Tencent_SecretKey="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    acme.sh --issue --dns dns_tencent -d example.com -d *.example.com
    ```

3. 编写 `acmedepoly.sh` 部署证书至七牛云

    ```bash
    #!/bin/bash

    export QINIU_AK="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    export QINIU_SK="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    # 如果需要多个域名则需要加上QINIU_CDN_DOMAIN，注意域名前面的点
    export QINIU_CDN_DOMAIN=".example.com"

    ~/.acme.sh/acme.sh --deploy -d example.com --deploy-hook qiniu
    ```

4. 部署任务自动化
    ::: details Mac 定时任务

    4.1 新建任务脚本

    ```shell
    vi ~/Library/LaunchAgents/com.user.acmedepoly.sh.plist
    ```

    4.2 编写任务脚本

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>

    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
      <dict>
        <!-- 任务唯一标识 -->
        <key>Label</key>
        <string>com.user.acmedepoly.sh</string>

        <!-- 设置执行间隔（88天 = 88*24*60*60秒） -->
        <key>StartInterval</key>
        <integer>7603200</integer>

        <!-- 指定要运行的脚本路径 -->
        <key>ProgramArguments</key>
        <array>
          <string>/bin/bash</string>
          <string>/path/to/acmedepoly.sh</string>
        </array>

        <!-- 输出日志（可选） -->
        <key>StandardOutPath</key>
        <string>/tmp/acmedepolysh.log</string>
        <key>StandardErrorPath</key>
        <string>/tmp/acmedepolysh-error.log</string>
      </dict>
    </plist>
    ```

    4.3 加载并启动任务

    ```shell
    # 加载任务
    launchctl load ~/Library/LaunchAgents/com.user.acmedepoly.sh.plist
    # 启动任务
    launchctl start com.user.acmedepoly.sh
    ```

    :::

5. TODO: 自动替换域名证书
