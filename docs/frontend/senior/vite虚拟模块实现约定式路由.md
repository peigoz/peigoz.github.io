---
title: vite虚拟模块实现约定式路由
date: 2025-06-19 04:28:59
tags:
 - Vite
isShowComments: true
publish: true
---

## 虚拟模块

虚拟模块是一种很实用的模式，它可以让我们通过 `esm` 模块引入语法插入一些编译时动态生成的信息。  
在 Vite（以及 Rollup）中虚拟模块都以  `virtual:`  为前缀，同时在创建插件解析该虚拟模块时将模块 ID 加上前缀  `\0`，以避免了其他插件尝试处理这个 ID。

```js
export default function myPlugin() {
  const virtualModuleId = "virtual:my-module";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "my-plugin", // 必须的，将会在 warning 和 error 中显示
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const msg = "from virtual module"`;
      }
    },
  };
}
```

## 约定式路由

什么是约定式路由？约定式路由一般指文件系统路由，页面的文件路径会简单映射为路由的路径，这样让整个项目的路由非常直观。  
在 `SSG` 框架中（如 `vitepress`、`fresh`），一般都会约定以 `docs` 目录下的文件路径作为路由的路径。如 `docs` 目录下有一个 `frontend.md` 的文件，则该文件对应的路由路径为 `/frontend`。

我们可以通过虚拟模块的方式在 vite 中实现该约定式路由的效果，下面我们手动实现一下约定式路由。
最终使用如下：

```tsx
import { createRoot } from 'react-dom/client';
import { Layout } from './Layout';
import { BrowserRouter } from 'react-router-dom';

function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  createRoot(containerEl).render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

renderInBrowser();

/// -- Layout.tsx --
import { useRoutes } from 'react-router-dom'
// 通过虚拟模块在编译时动态扫描 docs 目录下的文件生成对应的路由模块
import { routes } from 'virtual:routes'

export const Layout = () =>
  const routeElement = useRoutes(routes)

  return routeElement
}
```

接着我们实现一个 `vite` 插件用来解析 `virtual:routes` 虚拟模块,返回对应的 `routes` 对象

```ts
/// -- vite-plugin-routes.ts --
import { Plugin } from 'vite'
import { RouteService } from './RouteService'

// 本质: 把文件目录结构 -> 路由数据
interface PluginOptions {
  root: string
  isSSR: boolean
}

export const CONVENTIONAL_ROUTE_ID = 'virtual:routes'
export function pluginRoutes(options: PluginOptions): Plugin {
  const routeService = new RouteService(options.root) // root 为 docs 目录

  return {
    name: CONVENTIONAL_ROUTE_ID,
    resolveId(id: string) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return '\0' + id
      }
    },
    async configResolved() {
      // Vite 启动时，对 RouteService 进行初始化
      await routeService.init()
    },
    load(id: string) {
      if (id === '\0' + CONVENTIONAL_ROUTE_ID) {
        return routeService.generateRoutesCode(options.isSSR)
      }
    },
  }
}
```

我们把生成路由的代码的具体实现抽到 `RouteService` 中，下面是它的实现：

```ts
/// -- RouteService.ts --
import fastGlob from 'fast-glob'
import { normalizePath } from 'vite'
import path from 'path'

interface RouteMeta {
  routePath: string
  absolutePath: string
}

export class RouteService {
  #scanDir: string
  #routeData: RouteMeta[] = []
  constructor(scanDir: string) {
    this.#scanDir = scanDir
  }

  async init() {
    const files = fastGlob
      .sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
        cwd: this.#scanDir,
        absolute: true,
        ignore: ['**/node_modules/**', '**/build/**', 'config.ts', 'util.ts'],
      })
      .sort()
    files.forEach((file) => {
      const fileRelativePath = normalizePath(path.relative(this.#scanDir, file))
      // 1. 路由路径
      const routePath = this.normalizeRoutePath(fileRelativePath)
      // 2. 文件绝对路径
      this.#routeData.push({
        routePath,
        absolutePath: file,
      })
    })
  }

  // 获取路由数据，方便测试
  getRouteMeta(): RouteMeta[] {
    return this.#routeData
  }

  normalizeRoutePath(rawPath: string) {
    // 去掉文件后缀名 和 index 名字
    const routePath = rawPath.replace(/\.(.*)?$/, '').replace(/index$/, '')
    return routePath.startsWith('/') ? routePath : `/${routePath}`
  }

  generateRoutesCode(ssr = false) {
    return `
  import React from 'react';
  ${ssr ? '' : 'import loadable from "@loadable/component";'}
  ${this.#routeData
    .map((route, index) => {
      return ssr
        ? `import Route${index} from "${route.absolutePath}";`
        : `const Route${index} = loadable(() => import('${route.absolutePath}'));`
    })
    .join('\n')}
  export const routes = [
  ${this.#routeData
    .map((route, index) => {
      return `{ 
        path: '${route.routePath}', 
        element: React.createElement(Route${index}), 
        preload: () => import('${route.absolutePath}') 
      }`
    })
    .join(',\n')}
  ];
      `
  }
}
```

最后我们将该插件在 `vite.config.ts` 中使用即可，这里代码就不给出了

## 补充

虚拟模块可以让我们通过 `esm` 模块引入语法插入一些编译时动态生成的信息。在前端领域主要有以下应用场景：

1. ​​自动化配置生成：
    - 动态路由配置：如约定式路由
    - 环境变量注入：动态生成环境相关配置（如API端点），适配不同部署环境
2. ​​开发效率优化：
    - 提供动态数据：在构建时根据不同环境或配置动态生成应用所需的数据
    - 热更新支持：通过虚拟模块实现模块热替换（HMR），提升开发调试效率
3. ​​第三方服务集成：
    - 封装SDK：将API调用或数据分析服务封装为虚拟模块，简化调用逻辑
    - 项目信息注入：动态注入版本号、构建时间等信息，便于调试和日志追踪
