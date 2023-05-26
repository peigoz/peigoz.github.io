---
title: Nest其他相关
date: 2021-07-17 19:06:22
categories:
  - Nest
tags:
  - Node
  - Nest
isShowComments: true
publish: true
---

## Web 安全防护

Web 安全中，常见有两种攻击方式：XSS（跨站脚本攻击） 和 CSRF（跨站点请求伪造）。

1. 对 JWT 的认证方式，因为没有 cookie，所以也就不存在 CSRF。如果你不是用的 JWT 认证方式，可以使用 csurf 这个库去解决这个安全问题。
2. 对于 XSS，可以使用 helmet 去做安全防范。helmet 中有 12 个中间件，它们会设置一些安全相关的 HTTP 头。比如 xssFilter 就是用来做一些 XSS 相关的保护
3. 对于单 IP 大量请求的暴力攻击，可以用 express-rate-limit 来进行限速。
4. 对于常见的跨域问题，Nestjs 提供了两种方式解决，一种通过 app.enableCors() 的方式启用跨域，另一种像下面一样，在 Nest 选项对象中启用。

```ts
//在main.ts 中作为全局的中间件启用
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.use(helmet())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  )

  await app.listen(config.port, config.hostName, () => {
    Logger.log(
      `Awesome-nest API server has been started on http://${config.hostName}:${config.port}`
    )
  })
}
```

## HTTP 请求

Nestjs 中对 Axios 进行了封装，并把它作为 HttpService 内置到 HttpModule 中。HttpService 返回的类型和 Angular 的 HttpClient Module 一样，都是 observables，所以可以使用 rxjs 中的操作符处理各种异步操作。

1. 把 HttpModule 作为全局模块，在 sharedModule 中导入并导出以便其他模块使用。这时候我们就可以使用 HttpService，比如我们在 LunarCalendarService 中注入 HttpService，然后调用其 get 方法请求当日的农历信息。这时候 get 返回的是 Observable。

   ```ts
   // 1. 导入HttpModule
   import { Global, HttpModule, Module } from '@nestjs/common'

   import { LunarCalendarService } from './services/lunar-calendar/lunar-calendar.service'

   @Global()
   @Module({
     imports: [HttpModule],
     providers: [LunarCalendarService],
     exports: [HttpModule, LunarCalendarService],
   })
   export class SharedModule {}
   ```

2. 这个 Observable 流，可以通过 pipe 进行一系列的操作，比如我们直接可以使用 rxjs 的 map 操作符帮助我们对数据进行一层筛选，并且超过 5s 后就会报 timeout 错误，catchError 会帮我们捕获所有的错误，返回的值通过 of 操作符转换为 observable

   ```ts
   import { HttpService, Injectable } from '@nestjs/common'
   import { of, Observable } from 'rxjs'
   import { catchError, map, timeout } from 'rxjs/operators'

   @Injectable()
   export class LunarCalendarService {
     constructor(private readonly httpService: HttpService) {}

     getLunarCalendar(): Observable<any> {
       return this.httpService.get('https://www.sojson.com/open/api/lunar/json.shtml').pipe(
         map(res => res.data.data),
         timeout(5000),
         catchError(error => of(`Bad Promise: ${error}`))
       )
     }
   }
   ```

3. 如果需要对 axios 进行配置，可以直接在 Module 注册的时候设置：

```ts
import { Global, HttpModule, Module } from '@nestjs/common'

import { LunarCalendarService } from './services/lunar-calendar/lunar-calendar.service'

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [LunarCalendarService],
  exports: [HttpModule, LunarCalendarService],
})
export class SharedModule {}
```

## 模板渲染

1. 在 Nestjs 中，一般使用 hbs 作为模板渲染引擎,通过`npm install --save hbs`命令引入包

   ```ts
   import { NestFactory } from '@nestjs/core'
   import { NestExpressApplication } from '@nestjs/platform-express'
   import { join } from 'path'

   import { AppModule } from './app.module'
   import config from './config'
   import { Logger } from './shared/utils/logger'

   async function bootstrap() {
     const app = await NestFactory.create<NestExpressApplication>(AppModule, {
       cors: true,
     })

     app.setGlobalPrefix('api/v1')
     //static 文件夹用来存储静态文件，views 中含了模板文件
     app.useStaticAssets(join(__dirname, '..', 'static'))
     app.setBaseViewsDir(join(__dirname, '..', 'views'))
     app.setViewEngine('hbs')

     await app.listen(config.port, config.hostName, () => {
       Logger.log(
         `Awesome-nest API server has been started on http://${config.hostName}:${config.port}`
       )
     })
   }
   ```

2. 在 views 下新建一个 catsPage.hbs 的文件，假设，我们需要在里面填充的数据结构是这样

   ```json
   {
     "cats": [
       {
         "id": 1,
         "name": "yyy",
         "age": 12,
         "breed": "black cats"
       }
     ],
     "title": "Cats List"
   }
   ```

   实现模版如下,需要注意的是，如果有拦截器，数据会先经过拦截器的处理，然后再填充到模板中。

   ```html
   <body>
     <p>{{ title }}</p>
     <table class="table">
       <thead>
         <tr>
           <td class="id default-td">id</td>
           <td class="name default-td">name</td>
           <td class="age default-td">age</td>
           <td class="breed default-td">breed</td>
         </tr>
       </thead>
       <tbody>
         {{#each cats}}
         <tr>
           <td>{{id}}</td>
           <td>{{name}}</td>
           <td>{{age}}</td>
           <td>{{breed}}</td>
         </tr>
         {{/each}}
       </tbody>
     </table>
   </body>
   ```

3. 在 controller 中，通过 @Render 指定模板的名称，并且在 return 中返回需要填充的数据

```ts
@Get('page')
@Render('catsPage')
getCatsPage() {
  return {
    cats: [
      {
        id: 1,
        name: 'yyy',
        age: 12,
        breed: 'black cats'
      }
    ],
    title: 'Cats List',
  }
}
```

## Swagger 文档

Nestjs 中也提供了对 swagger 文档的支持，方便我们对 API 进行追踪和测试：`$ npm install --save @nestjs/swagger swagger-ui-express`

1. 访问 `http://localhost:3300/docs` 就可以看到 swagger 文档的页面。

   ```ts
   //main.ts
   const options = new DocumentBuilder()
     .setTitle('Awesome-nest')
     .setDescription('The Awesome-nest API Documents')
     .setBasePath('api/v1')
     .addBearerAuth()
     .setVersion('0.0.1')
     .build()

   const document = SwaggerModule.createDocument(app, options)
   SwaggerModule.setup('docs', app, document)
   ```

2. 对于不同的 API 可以在 controller 中使用 @ApiUseTags() 进行分类，对于需要认证的 API，可以加上 @ApiBearerAuth()，这样在 swagger 中填完 token 后，就可以直接测试 API：

   ```ts
   @ApiUseTags('cats')
   @ApiBearerAuth()
   @Controller('cats')
   @UseGuards(AuthGuard())
   export class CatsController {
     constructor(private readonly catsService: CatsService) {}

     @Get('page')
     @Render('catsPage')
     getCatsPage(): Promise<any> {
       return this.catsService.getCats()
     }
   }
   ```

3. 对于我们定义的 DTO，为了使 SwaggerModule 可以访问类属性，我们必须用 @ApiModelProperty() 装饰器标记所有这些属性

```ts
import { ApiModelProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class AccountDto {
  @ApiModelProperty()
  @IsString()
  @IsEmail()
  readonly email: string

  @ApiModelProperty()
  @IsString()
  readonly password: string
}
```

::: primary 更多 swagger 文档 用法请观看官网[OpenAPI (Swagger)](https://docs.nestjs.cn/7/openapi?id=%e4%bb%8b%e7%bb%8d)
:::

## 热重载

在开发的时候，运行 npm run start:dev 的时候，是进行全量编译，如果项目比较大，全量编译耗时会比较长，这时候我们可以利用 webpack 来帮我们做增量编译，这样会大大增加开发效率

1. 首先，安装 webpack 相关依赖:

   ```dos
   npm i --save-dev webpack webpack-cli webpack-node-externals ts-loader
   ```

2. 在根目录下创建一个 webpack.config.js：

   ```js
   const webpack = require('webpack')
   const path = require('path')
   const nodeExternals = require('webpack-node-externals')

   module.exports = {
     entry: ['webpack/hot/poll?100', './src/main.ts'],
     watch: true,
     target: 'node',
     externals: [
       nodeExternals({
         whitelist: ['webpack/hot/poll?100'],
       }),
     ],
     module: {
       rules: [
         {
           test: /.tsx?$/,
           use: 'ts-loader',
           exclude: /node_modules/,
         },
       ],
     },
     mode: 'development',
     resolve: {
       extensions: ['.tsx', '.ts', '.js'],
     },
     plugins: [new webpack.HotModuleReplacementPlugin()],
     output: {
       path: path.join(__dirname, 'dist'),
       filename: 'server.js',
     },
   }
   ```

3. 在 main.ts 中启用 HMR

   ```ts
   declare const module: any

   async function bootstrap() {
     const app = await NestFactory.create(ApplicationModule)
     await app.listen(3000)

     if (module.hot) {
       module.hot.accept()
       module.hot.dispose(() => app.close())
     }
   }
   bootstrap()
   ```

4. 在 package.json 中增加下面两个命令：

   ```json
   {
     "scripts": {
       "start": "node dist/server",
       "webpack": "webpack --config webpack.config.js"
     }
   }
   ```

5. 运行 `npm run webpack`之后，webpack 开始监视文件，然后在另一个命令行窗口中运行 `npm start`。

::: right
参考 [tc9011](https://juejin.cn/post/6844903903792742407#heading-2)
:::
