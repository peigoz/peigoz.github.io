---
title: Rust编译的 wasm 在 Vite 中使用
date: 2025-03-17 18:06:20
tags:
 - wasm
isShowComments: true
publish: true
---

## Rust 编译为 wasm

1. 下载安装 rust 相关环境: `rustup`(rust的版本管理工具)、`cargo`(rust 依赖管理工具)
  
    ```shell(linux|mac)
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
    ```

2. 下载安装 wasm 相关环境：`wasm-pack`(负责将 rust 编译为 wasm)、`cargo-generate`(wasm 项目脚手架)。

    ```shell(linux|mac)
    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

    # 要求有OpenSSL环境
    cargo install cargo-generate
    # 如果没有OpenSSL环境可以使用下面的命令安装
    cargo install cargo-generate --features vendored-openssl
    ```

3. 创建一个 wasm 项目

    ```shell
    cargo generate --git https://github.com/rustwasm/wasm-pack-template
    ```

4. rust 文件内容如下：

    ```rust
    use wasm_bindgen::prelude::*;

    #[wasm_bindgen]
    extern {
        fn alert(s: &str);
    }

    #[wasm_bindgen]
    pub fn greet() {
        alert("Hello, wasm-game-of-life!");
    }
    ```

5. 编译为 wasm

    ```shell
    wasm-pack build --target web
    ```

6. 编译产物在 `pkg` 目录下

## Vite 中使用 wasm

1. 安装 `vite-plugin-wasm` 插件并配置

    ```vite.config.js
    import wasm from "vite-plugin-wasm";

    export default defineConfig({
      plugins: [
        wasm(),
      ]
    });
    ```

2. 使用方式一：直接将 pkg 目录下的 wasm 文件和胶水层 js 文件拷贝到项目的 wasm 目录下

    ```javascript
    import init, { greet } from "./pkg/wasm_example.js";

    async function run() {
      await init(); // 初始化 wasm，这里会返回 wasm 对象，也可以通过 wasm对象获取到导出的函数和wasm.memory等

      greet();
    }

    run();
    ```

3. 使用方式二：pkg 其实是一个npm包，可以直接发布至内网并通过 npm 安装使用, 但此时需要配置 optimizeDeps 选项（ 支持 [tinyglobby](https://github.com/SuperchupuDev/tinyglobby) 语法  ）避免 wasm 被优化

    ```vite.config.js
    import wasm from "vite-plugin-wasm";

    export default defineConfig({
      plugins: [
        wasm(),
      ]，
      optimizeDeps: { // [!code ++]
        // wasm_example 是 wasm 的 npm 包名// [!code ++]
        exclude: ['wasm_example']  // [!code ++]
      } // [!code ++]
    });
    
    ```
