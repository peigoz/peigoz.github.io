---
title: 如何在vscode中用rust刷leetcode
date: 2025-04-16 04:24:48
tags:
 - Rust
isShowComments: true
publish: true
---

## 步骤

### 安装 vscode 插件

1. vscode-leetcode（ leetcode 题库）
2. CodeLLDB （ Debug Rust ）
3. rust-analyzer （ Rust 编译器代码提示）
4. pucelle.run-on-save （新建的题目保存触发脚本修改 lib.rs ，从而触发编译器检查）
    - 注： emeraldwalk的那个插件不支持配置正则搜索文件夹触发脚本，只能配置文件名后缀

### 创建 leetcode 项目

1. 使用 `cargo new leetcode-rs --lib` 创建一个 rust 项目，这一步是因为 **rust-analyzer** 插件是以项目为基础去进行编译检查的
2. 如果不使用 cargo ，也可以在文件夹下新建一个 `rust-project.json` 文件去替代 `Cargo.toml` 组织项目配置。

```json
// rust-project.json
{
  // rustc 会根据该属性去寻找 rust 标准库（例如 std）的位置。 可以通过 rustc --print sysroot 来获取 sysroot 的值。
  "sysroot": "xxx", 
  // 描述项目文件的具体信息
  "crates": [ 
    {
      "root_module": "xxx.rs", // 入口文件的路径
      "edition": "2024", // crate 的版本
      "deps": [] // 项目依赖
    }
  ]
}

```

### 修改 leetcode 插件配置

1. 因为 leetcode 插件默认新建题目的文件名都是  `${id}.${kebab-case-name}.${ext}` 格式（1.两数之和.rs），rust 项目规范中文件名不能包含点 **.** ，所以这里要替换以下默认的格式。同时配置 leetcoe 文件夹目录。

```json
// settings.json
"leetcode.workspaceFolder": "/leetcode",
"leetcode.filePath": {
  "default": {
    // 在 src 下新建 solutions 文件夹作为 leetcode 的目录
    "folder": "src/solutions",
    // 将文件名 . 改为 _
    "filename": "${id}_${kebab-case-name}.${ext}"
  }
},
```

### 使用 automod 宏自动添加引用新题目到模块

1. 项目安装 automod : `cargo add automod`
2. 在项目 lib.rs 下使用宏自动引入 solutions 下的模块
3. 这一步如果不是用 cargo 新建的项目，那么自己写脚本通过 run-on-save 让每次保存的时候更新 `rust-project.json` 里面的 **crates** 信息

```rust
// src/lib.rs 

const CURRENT: &str = "xxx.rs";

pub mod solutions {
    automod::dir!("src/solutions");
}
```

### 使用 run-on-save

1. 这一步的目的是为了新建题目文件的时候可以通过保存自动去修改 lib.rs 文件内容从而让 automod 引入新的题目模块和触发 rust-analyser 去做代码检查和提示
2. 需要在项目下配置 run-on-save

    ```json
    // 新建 .vscode 文件夹和 settings.json 文件
    // .vscode/settings.json
    {
      "runOnSave.commands": [
        {
          // 匹配 src 文件夹下的任何 rs 文件改动时触发 command 
          "globMatch": "leetcode-rs/src/**/*.rs",
          // 编写 onsave.sh 脚本去修改 src/lib.rs 文件从而触发 rust-analyser 重新分析项目，这里我把脚本都丢进.vscode 文件夹内
          "command": "sh .vscode/onsave.sh ${fileBasename}", 
          "runIn": "backend",
        },
      ],
    }
    ```

3. 编写 onsave.sh 脚本，window 可以让 ai 重新改写下

```bash .vscode/onsave.sh
#!/bin/bash

# 触发保存的文件名
FILE=$1

# 目标文件路径
TARGET_FILE="leetcode-rs/src/lib.rs"

if [[ $(grep -c "$FILE" "$TARGET_FILE") -eq 0 ]]; then
    # 修改 CURRENT 变量为 触发更新的文件名称
    sed -i '' -E "s/(CURRENT: &str = \")[^\"]*(\";.*)/\1$FILE\2/" "$TARGET_FILE"
    # 修改 src/lib.rs 里面的 automod::dir!(pub "src/solutions"); 语句
    # 通过添加和移除 pub 前缀来触发 rust-analyser 重新分析项目
    if [[ $(grep -c '::dir!(pub' "$TARGET_FILE") -eq 1 ]]; then
        sed -i '' "s|::dir!(pub |::dir!(|" "$TARGET_FILE"
    else
        sed -i '' "s|::dir!(|::dir!(pub |" "$TARGET_FILE"
    fi
fi
```

### 修改 leetcode 插件自动添加测试用例

1. leetcode 插件不支持动态配置新建题目文件的模版，这里我们需要去修改 leetcode 插件源码
2. **mac** 目录： ~/.vscode/extensions/leetcode.vscode-leetcode-xxx/out/src/leetCodeExecutor.js
3. **window** 目录： C:\Users\<用户名>\.vscode\extensions\leetcode.vscode-leetcode-xxx\...

```js
showProblem(){
  // more...
  if (!(yield fse.pathExists(filePath))) {
    yield fse.createFile(filePath);
    const codeTemplate = yield this.executeCommandWithProgressEx("Fetching problem data...", this.nodeExecutable, cmd);
    yield fse.writeFile(filePath, codeTemplate);
  }
  // 在这里后添加插桩代码  // [!code ++:26]
  if (language == 'rust') {
    const code = yield fse.readFile(filePath, 'utf-8');
    if (code && !code.includes("mod test")) {
      const regex = /.*pub\s+fn\s+(\w+)/s; // 匹配最后一个 pub fn Name
      const match = code.match(regex);
      const funcName = match ? match[1] : 'fn'
      const rustTemplate = `
#[allow(unused)]
struct Solution;

#[cfg(test)]
mod test {
    #[allow(unused)]
    use super::*;

    #[test]
    fn test_${funcName}() {
        //assert_eq!(Solution::${funcName}(vec![]),[]);
        assert!(true)
    }
}
`
      yield fse.appendFile(filePath, rustTemplate);
    }
  }
  // 插桩结束
  // more...
}
```

### 开始1_两数之和.rs🤪
