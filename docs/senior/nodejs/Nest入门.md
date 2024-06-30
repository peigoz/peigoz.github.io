---
title: Nest入门
date: 2021-6-27 17:19:29
tags:
  - Node
publish: true
---

## 路由与控制器

### 路由路径匹配规则

```js
// 主路径为 home
@Controller("home")

// 1. 固定路径
// 可匹配到的访问路径：
//   http://localhost:3000/home/greeting
@Get("greeting")

// 2. 通配符路径(通配符可以有 ?, +, * 三种)
// 可匹配到的访问路径：
//   http://localhost:3000/home/say_hi
//   http://localhost:3000/home/say_hello
//   http://localhost:3000/home/say_good
//   ...
@Get("say_*")

// 3. 路径数组
// 可匹配到的访问路径：匹配上面1和2里的所有路径
@Get(["greeting", "say_*"])

// 4. 带参路径
// 可匹配到的访问路径：
//   http://localhost:3000/home/greeting/hello
//   http://localhost:3000/home/greeting/good-morning
//   http://localhost:3000/home/greeting/xxxxx
//   ...
@Get("greeting/:words")
```

### 标准模式和特定库模式

1. 这样一段请求

   ```url
   http://localhost:3000/home/greeting?from=hello
   ```

2. 标准模式下获取参数的代码

   ```ts
   import { Controller, Get, Query } from '@nestjs/common'

   @Controller('home')
   export class AppController {
     @Get('greeting')
     getHello(@Query('from') from: string): string {
       return `A greeting from ${from}`
     }
   }
   ```

3. 特定库模式(express)下获取参数的代码

   ```ts
   import { Controller, Get, Req, Res } from '@nestjs/common'
   import { Request, Response } from 'express'

   @Controller('home')
   export class AppController {
     @Get('greeting')
     getHello(@Req() req: Request, @Res() res: Response) {
       const { from } = req.query
       res.send(`A greeting from ${from}`)
     }
   }
   ```

### 其他常用装饰器的功能

#### @Param - 路径动态参数装饰器

```url
http://www.myblog.com/articles/20191110
http://www.myblog.com/articles/20191111
http://www.myblog.com/articles/20191112
```

```ts
import { Controller, Get, Param } from '@nestjs/common'

@Controller('articles')
export class ArticleController {
  @Get(':date')
  getArticles(@Param('date') date: string): string {
    return `Articles for ${date}`
  }
}
```

#### @Post + @Body - 获取 POST 请求的请求体

获取 body 数据

```test
{
  "title": "你好！",
  "content": "世界。"
}
```

```ts
interface CreateArticleDto {
    title: string;
    content: string;
}

// ....

@Post()
async create(@Body() article: CreateArticleDto) {
  console.log(article); // {"title": "你好！","content": "世界。"}
  this.articleService.create(article);
  return 'New article is created';
}
```

### @Headers 和 @Header - 获取请求头和设置响应头

```ts
//使用@Header装饰器添加响求头信息使用
//@Headers获取请求头信息
@Post("test")
@Header('Access-Control-Allow-Origin', '*')
test(@Headers("Authorization ") token: string) {
  return `Authorization  is ${token}`
}
```

## 面向切面编程

1. 面向切面编程（Aspect Oriented Programming，简称 AOP）主要是针对业务处理过程中的切面进行提取，在某个步骤和阶段进行一些操作，从而达到 DRY（Don't Repeat Yourself） 的目的。AOP 对 OOP 来说，是一种补充，比如可以在某一切面中对全局的 Log、错误进行处理，这种一刀切的方式，也就意味着，AOP 的处理方式相对比较粗粒度。
   在 Nestjs 中，AOP 分为下面几个部分（按顺序排列）：
   1. Middlewares
   2. Guards
   3. Interceptors (在流被操纵之前)
   4. Pipes
   5. Interceptors (在流被操纵之后)
   6. Exception filters (如果发现任何异常)

### Middlewares(中间件)

1. Middleware 和 express 的中间件一样，可以直接使用 express 中的中间件

```ts
//main.ts

//helmet 是一个包括了 12 个中间件，用来设置一些安全的 headers 的集合。
import * as helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: false,
  })

  app.use(helmet())

  await app.listen(config.port, config.hostName, () => {
    Logger.log(`Flash API server has been started on http://${config.hostName}:${config.port}`)
  })
}
```

### Guards(守卫)

1. Guards 和前端路由中的路由守卫一样，主要确定请求是否应该由路由处理程序处理。通过守卫可以知道将要执行的上下文信息，所以和 middleware 相比，守卫可以确切知道将要执行什么。
2. 守卫在每个中间件之后执行的，但在拦截器和管道之前。

```ts
//service.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

//使用implements约束类的实现
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    // validateRequest 函数实现 Request 的验证
    return validateRequest(request)
  }
}
```

### Interceptors(拦截器)

1. Interceptors 可以给每一个需要执行的函数绑定，拦截器将在该函数执行前或者执行后运行。可以转换函数执行后返回的结果，扩展基本函数行为等。

```ts
//service.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
//rxjs: 用于 JavaScript 的 ReactiveX 库。 RxJS 是使用 Observables 的响应式编程的库，它使编写异步或基于回调的代码更容易。
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { getFormatResponse } from '../../shared/utils/response'

export interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(getFormatResponse))
  }
}
```

### Pipes(管道)

1. Pipe 是具有 @Injectable() 装饰器的类，并实现了 PipeTransform 接口。通常 pipe 用来将输入数据转换为所需的输出或者处理验证。

```ts
//这是一个 ValidationPipe， 会根据元数据和对象实例，去构建原有类型，然后配合DTO 中的 class-validator 和 class-transformer ，可以更方便地对参数进行校验。
import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    if (!metatype || this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed')
    }
    return value
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return types.includes(metatype)
  }
}

//这个 pipe 一般会作为全局的 pipe 去使用,假设我们没有这层 pipe，那在 controller 中就会进行参数校验，这样就会打破单一职责的原则。有了这一层 pipe 帮助我们校验参数，有效地降低了类的复杂度，提高了可读性和可维护性。
//main.ts
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule)
  app.setGlobalPrefix('api/v1')

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
}
bootstrap()
```

### Exception filters(异常处理)

1. 内置的 Exception filters 负责处理整个应用程序中的所有抛出的异常，也是 Nestjs 中在 response 前，最后能捕获异常的机会。

```ts
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    response.status(status).json({
      statusCode: exception.getStatus(),
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
```

### 利用 AOP 的思想使用 Interceptor 和 Exception Filter 去处理全局错误

1. Interceptor 会在 Exception Filter 之前触发，所以 Exception Filter 会是最后捕获 exception 的机会。

```ts
//全局捕获错误的切片层去处理所有的 exception；
import { Catch, ArgumentsHost, HttpException, ExceptionFilter, HttpStatus } from '@nestjs/common'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  async catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    let message = exception.message
    let isDeepestMessage = false
    while (!isDeepestMessage) {
      isDeepestMessage = !message.message
      message = isDeepestMessage ? message : message.message
    }

    const errorResponse = {
      message: message || '请求失败',
      status: 1,
    }

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}

// Interceptor 则负责对成功请求结果进行包装：
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(rawData => {
        return {
          data: rawData,
          status: 0,
          message: '请求成功',
        }
      })
    )
  }
}

// Interceptor 和 Exception Filter 需要把它定义在全局范围内
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')

  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
}
```

## NestJS 中依赖注入

1. 基于 IoC(Inversion of Control 控制反转) 框架的应用程序开发中，我们编写的代码都依赖于这个容器，容器管理着代码中各个对象间的关联关系，为它们注入需要的外部资源。容器最适合管理的资源是那些具有高可复用性的内容，如：配置信息、全局常量、可复用的业务逻辑组件、以及工具类等等。
2. 在使用了依赖注入功能的程序中，从资源的角度，可以把代码中的对象角色分为以下 3 种：
   - 容器(module) - 是所有资源的管理者。程序中可被注入的资源都由容器来发起创建和维护其生命周期
   - 资源提供者(service) - 资源创建的实际执行者。所有的资源提供者都需要在容器进行注册登记，然后由容器来进行统一调度
   - 资源使用者(controller) - 就是那些需要使用到容器中管理的那些资源的消费者了
     有些情况下，资源提供者本身即是提供者也是使用者。记住一点，只要依赖于其他资源的对象，它就是一个资源使用者。
3. NestJS 命令行工具提供的代码生成器功能，可以帮我们快速生成一个模块（Module）代码文件。
   1. 在 Nest 项目下执行`nest g module product`后，可以看到项目的 src 目录下多了一个 product 子目录，且下面生成了一个名为 product.module.ts 的模块代码文件。
   2. 执行命令`nest g service product`, 可以在 product 目录下生成了一个名为 product.service.ts 的文件，以及一个同名的 spec 文件，前者就是一个典型的类资源提供者，后者是它对应的单元测试类。
   3. 执行命令`nest g co product`,可以在 product 目录又生成了一个名为 product.controller.ts 的文件，以及一个同名的 spec 文件。
4. 在 MVC 模式中，controller 通过 model 获取数据。对应的，在 Nestjs 中，controller 负责处理传入的请求，并调用对应的 service 完成业务处理，返回对客户端的响应。
5. 如果需要在所有请求之前加上 prefix，可以在 main.ts 中直接设置 GlobalPrefix

```ts
//main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  await app.listen(3000)
}
bootstrap()
```

### Nest 中一个容器注入的例子

1. 步骤一：将 Car 类使用 @Injectable 装饰器，声明成其可被容器进行注入的资源

   ```ts
   // car.ts

   import { Injectable } from '@nestjs/common'

   @Injectable()
   export class Car {
     constructor(private readonly name: string) {}

     start() {
       console.log(`Your ${this.name} is start running!`)
     }
   }
   ```

2. 步骤二：通过构造函数，注入需要使用 Car 的类中

   ```ts
   // app.controller.ts

   import { Controller, Get } from '@nestjs/common'
   import { Car } from './car'

   @Controller()
   export class AppController {
     constructor(
       // 自动注入Car对象
       private readonly car: Car
     ) {}

     @Get('test/car')
     testCar(): string {
       // 控制台打印car的内容
       console.log(this.car) //Car { name: '保时捷911' }
       // 调用car对象的方法
       this.car.start() //Your 保时捷911 is start running!
       return 'test done!'
     }
   }
   ```

3. 步骤三：在模块配置中，配置 Car 类的对象提供器(将 Car 类注入容器中使其可被 controller 注入)

   ```ts
   // app.module.ts

   import { Module } from '@nestjs/common'
   import { AppController } from './app.controller'
   import { AppService } from './app.service'
   import { Car } from './car'

   @Module({
     imports: [],
     controllers: [AppController],
     providers: [
       // 配置一辆保时捷
       {
         provide: Car,
         useFactory: () => {
           return new Car('保时捷911')
         },
       },
     ],
   })
   export class AppModule {}
   ```

### 资源提供者

1. 在 NestJS 框架中，基础类型值、对象、函数等，都可以被作为资源来使用。在代码中要使用这些资源，需要经过一种中间者来创建和提供：资源提供者（Providers）。

2. NestJS 中的资源提供者主要分为 4 种类型

#### 一、使用类作为提供者，称为 ClassProvider

1. 它也是我们日常开发中会最经常用到的一种资源提供者。一个普通的类，通过添加 @Injectable 装饰器，就可以成为一个资源提供者。
2. 资源提供者是需要先经过注册之后才能被容器所使用。资源提供者的注册工作是在模块（Module）中进行的。

```ts
//product.service.ts
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductService {
  getProducts(): string[] {
    return ['iPhone 11', 'iPhone 11 pro', 'iPhone 11 pro max']
  }
}

//product.module.ts
import { Module } from '@nestjs/common'
import { ProductService } from './product.service'

@Module({
  //简写
  // providers: [ProductService],

  //完整写法
  //provide 属性被称为注入令牌（Injection Token），类似于像在 Map 中存储值时的 key
  //useClass 则用于指定生成资源实例的类。
  providers: [
    {
      provide: ProductService,
      useClass: ProductService,
    },
  ],
})
export class ProductModule {}
```

#### 二、使用常量值（可以是简单基础类型值，也可以是对象），称为 ValueProvider

1. 适用于做配置性的工作，或者是 Mock 测试。

```ts
import { Module } from '@nestjs/common'
import { ProductService } from './product.service'

//全局配置
@Module({
  providers: [
    ProductService,
    {
      provide: 'AUTHOR_NAME',
      useValue: '全局常量注入',
    },
  ],
}) //Mock // Mock对象
const myProductService = {
  getProducts() {
    return ['iPhone 4', 'iPhone 4s']
  },
}

@Module({
  providers: [
    {
      provide: ProductService,
      // 使用Mock对象来替代原先通过ProductService类生成的对象
      useValue: myProductService,
    },
  ],
})
export class ProductModule {}
```

#### 三、使用工厂函数，称为 FactoryProvider

1. 适用于需要更为动态的创建资源的场景。

```ts
//product.service.ts
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductService {
  // 构造函数，接受一个 author参数
  constructor(private readonly author: string) {}
  getProducts(): string[] {
    return ['iPhone 11', 'iPhone 11 pro', 'iPhone 11 pro max']
  }
}

//product.module.ts
import { Module } from '@nestjs/common'
import { ProductService } from './product.service'

@Module({
  providers: [
    {
      provide: 'AUTHOR_NAME',
      useValue: '全局常量注入',
    },
    {
      provide: ProductService,
      // 工厂函数
      useFactory: (author: string) => {
        return new ProductService(author)
      },
      // 注入其他资源作为工厂函数参数，可通过this.AUTHOR_NAME获取到上面的值
      inject: ['AUTHOR_NAME'],
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
```

#### 四、用于给其他已有的资源提供者创建其他别名的方式，称为 ExistingProvider

```ts
import { Module } from '@nestjs/common'
import { ProductService } from './product.service'

@Module({
  providers: [
    // 一个class类提供者
    ProductService,
    // 上面的提供者的别名
    {
      provide: 'AliasedProductService',
      useExisting: ProductService,
    },
  ],
})
export class ProductModule {}
```

### 资源注入方式

1. 在依赖注入框架中，资源通过容器的调度，被注入到资源使用者内。在 NestJS 中，我们的资源使用者都是以类的形式存在的，所以资源的注入方式存在以下 2 种可能：
   1. 通过类的构造函数注入
   2. 通过类的属性注入

```ts
// 通过构造函数的方式
@Injectable()
export class CategoryService {
  constructor(private readonly productService: ProductService) {}
}

//如果资源的注入令牌不是 class 类型的，则需要显式的使用 @Inject 装饰器来指定
@Injectable()
export class CategoryService {
  constructor(
    @Inject('myProductService')
    private readonly productService: ProductService
  ) {}
}
//另一种可选途径，通过属性注入
@Injectable()
export class CategoryService {
  @Inject('myProductService')
  private readonly productService: ProductService
}
```

值得注意的是，当你的代码中指定了资源注入，而容器中却并没有相应资源的时候，程序会报错。但有时候你的代码期望这样工作：如果程序中提供了配置信息，则使用该配置信息，否则使用默认配置信息。这种情况下，作为注入资源的配置信息显然是可选的，即使没有，程序也不该出错。NestJS 当然考虑到了这一点，它提供了 @Optional 装饰器来满足上述场景：

```ts
@Injectable()
export class CategoryService {
  constructor(
    @Optional()
    @Inject('myProductService')
    private readonly productService: ProductService
  ) {}
}
```

### 依赖注入边界

1. 在日常开发中也会遇到，但不是那么高频的依赖问题:
   1. 异步资源提供者
   2. 循环依赖问题与解决方式
   3. 注入范围

#### 异步资源提供者

1. 在资源创建的时候，存在异步的环节。 例如在创建资源的时候，需要先访问一个后端 API 来获取一些配置信息，然后根据这些配置信息再做进一步的资源创建。这里的后端 API 访问就是一个异步的动作，这会导致整个资源创建流程也是异步的了。
2. 在 NestJS 中，大多数的资源提供者都是只支持同步，比如 ValueProvider 和 ClassProvider，能支持异步的只有 FactoryProvider。

```ts
{
  provide: ProductService,
  //将原先 useFactory 指定的工厂函数声明成 async 方式的函数，就可以支持异步的创建流程了。
  useFactory: async () => {
    // 调用远程接口获取信息
    const configInfo = await getProductServiceConfig()

    // 根据远程返回的数据作进一步实例化
    if (configInfo.category) {
      return new ProductService(configInfo.category)
    } else {
      return new ProductService()
    }
  }
}
```

#### 循环依赖问题与解决方式

1. 所谓的循环依赖，就是指两个类之间存在互相依赖的情况，例如：资源 A 依赖资源 B，资源 B 也需要依赖 A，这种情况下，无论是在创建 A 还是创建 B 的时候，其实彼此都还不存在，也就是互相找不到对方来满足依赖，这就会发生错误。
2. 在模块之间或提供者之间的嵌套都可能会出现循环依赖关系。通常情况下，我们在设计的时候应该尽量避免循环依赖，但是总有避免不了的情况，在 NestJS 中提供了一种称为前向引用 (forward referencing) 的技术来解析循环依赖项。

```ts
//serviceA
@Injectable()
export class CategoryService {
  constructor(
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService
  ) {}
}

//serviceB
@Injectable()
export class ProductService {
  constructor(
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService
  ) {}
}
```

以上的 2 个类之间有互相依赖关系，各自需要注入对方。如果未使用代码中 NestJS 框架提供的 forwardRef () 工具函数，就会报错提示找不到依赖的资源；而使用后，容器可以正确处理互相使用 forwardRef () 函数标记过的类。

该工具函数也可作用于 2 个模块之间，解决模块间的循环依赖：

```ts
//moduleA
@Module({
  imports: [forwardRef(() => CategoryModule)],
})
export class ProductModule {}

//moduleB
@Module({
  imports: [forwardRef(() => ProductModule)],
})
export class CategoryModule {}
```

除了使用上面提到的 forwardRef () 工具函数，NestJS 还另外提供了一种可行的方式来解决循环依赖，那就是模块引用（Module Reference）。模块引用解决问题的思路是：不通过容器的自动依赖注入，而由我们自己来控制。

通过在类中注入框架提供的 ModuleRef，并在模块初始化的生命周期函数中进行手动查找所需要的资源实例，就能避免自动注入时的尴尬问题：

```ts
import { Injectable, OnModuleInit } from '@nestjs/common'
import { ProductService } from './product.service'
import { ModuleRef } from '@nestjs/core'

@Injectable()
export class CategoryService implements OnModuleInit {
  private productService: ProductService

  // 注入框架提供的ModuleRef实例
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    //使用 moduleRef 从当前模块中查询 ProductService 资源实例
    this.productService = this.moduleRef.get(ProductService)
  }
}
```

#### 注入范围

1. 默认情况下，NestJS 容器中创建的资源对象都是单例的。受益于 Node.js 的单进程模型，单例模式在 NestJS 下的使用是非常安全的，不像其他多线程语言对单例的访问操作会存在线程安全问题。因此，在绝大多数情况下，我们的 NestJS 程序在资源创建这块，都推荐使用默认的单例方式。
2. 这种方式，其实也代表了资源的生存范围（Scope）。比如单例的话，是在应用启动后就被初始化，一直到应用关闭。
3. 既然有单例方式，那肯定还有其他方式的存在。NestJS 提供了 3 种范围：
   - 单例（SINGLETON）- 默认值，应用一启动就被实例化，只有一个对象实例，在整个应用程序范围内被共享
   - 请求（REQUEST）- 针对于每个请求生成一个实例，请求处理结束后销毁
   - 零时（TRANSIENT）- 为每个资源消费者生成一个专用实例
     如果没有特别的原因，建议不要使用 SINGLETON 以外的方式，因为其他两种方式会增加系统消耗，影响到程序的性能。
4. 我们可以在类的 @Injectable 装饰器中指定范围：

   ```ts
   //service
   import { Injectable, Scope } from '@nestjs/common'

   @Injectable({ scope: Scope.REQUEST })
   export class MyService {}
   ```

5. 也可以在定义资源提供者的地方指定范围：

   ```ts
   //module
   {
     provide: 'MY_MANAGER',
     useClass: MyManager,
     scope: Scope.TRANSIENT,
   }
   ```

::: danger 注意
资源依赖路径上的范围会有层级关系，是一个从底至上的冒泡关系，比如下面这样一个 A 依赖 B，B 依赖 C 的关系中,如果我们指定 BService 的范围为 REQUEST，那么上层的 AService 也会变成 REQUEST 的，而下层的 CService 则仍保持默认的 SINGLETON。
:::

```text
AService <- BService <- CService
```

## 模块系统

1. NestJS 框架中，在使用了 JavaScript 模块系统的基础上，又引入了一种特有的模块系统，它只用于管理 NestJS 应用程序中的特定资源内容，声明它们在依赖注入环境下的作用域。
2. NestJS 中存在容器(module)，容器中存在一个个 NestJS 模块，每个模块拥有控制器(controller)、资源提供者(service)。
3. 每个 NestJS 应用程序其实是由模块组合而成的，它至少需要有一个模块（称为根模块）。多个模块组成一个树状结构。小型应用可能只需要一个根模块就行了，大型应用通常会由大量模块组织而成。

### 模块的创建

1. 通过在一个普通的类上添加 @Module 装饰器声明来创建。
2. @Module 装饰器有 4 个配置项，它们的作用分别如下：
   1. imports - 需要引入其他模块或者第三方模块，需要将它注册到 imports
   2. providers - 属于当前模块的资源提供者
   3. controllers - 属于当前模块的路由控制器
   4. exports - 模块默认情况对外界访问是封闭的。也就是说，一个模块在未作特别声明的情况下，其内部的资源是不能在两个模块间进行互相依赖注入的，只有本模块内部的资源才能互相注入。如果要支持跨模块注入，需要使用 exports 共享出去。当其他模块导入当前模块后，可访问到的属于当前模块的资源提供者(当前 providers 中的资源)、或由当前模块导入的其他三方模块(当前 import 中的模块)

```ts
import { Module } from '@nestjs/common'
import { DemoService } from './demo.service'

@Module({
  imports: [],
  controllers: [],
  providers: [DemoService],
  exports: [DemoService],
})
export class DemoModule {}
```

### 模块的分类：功能模块与共享模块

1. 在实际的软件程序中，一定会存在业务类代码和辅助工具类代码。有了模块系统，我们能更好的归类划分不同职责的代码。划分的原则还是以业务和非业务功能为基础，业务上相关联的代码（包括只在该业务中所使用的工具代码）尽量组织在同一个模块中；而和业务无关的、可被其他模块通用的代码，可以按功能分类组织在一个或多个模块之中。

### 模块的重组

1. 一个模块可以通过 imports 导入其他模块，也可以通过 exports 再次导出这些导入的模块。这样做的目的是：可以实现将各种小粒度的模块排列组合成各种稍大粒度的模块，按照实际需要选择使用稍大粒度的模块，而不是总导入数量较多的小粒度模块。

```ts
//此时在另一个模块中导入了当前模块，即会一次性导入三个模块
@Module({
  imports: [HelperAModule, HelperBModule],
  exports: [HelperAModule, HelperBModule],
})
export class HelperModule {}
```

### 模块的依赖注入

1. 模块类本身也可以进行依赖注入，让其他资源注入到模块类中。

```ts
import { Module } from '@nestjs/common'
import { DemoService } from './demo.service'

@Module({
  imports: [],
  controllers: [],
  providers: [DemoService],
  exports: [DemoService],
})
export class DemoModule {
  constructor(private readonly demoService: DemoService) {
    console.log(demoService)
  }
}
```

### 模块的全局化

1. NestJS 提供了 `@Global` 装饰器可以将模块（比如数据库连接模块、Redis 缓存模块、一些公用工具模块等）声明成全局作用域。

```ts
import { Module, Global } from '@nestjs/common'
import { DemoService } from './demo.service'

//这样一来，需要使用到这个 DemoModule 中资源的其他模块，就不需要通过 imports 来导入它就能使用了。
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [DemoService],
  exports: [DemoService],
})
export class DemoModule {}
```

### 动态模块

1. 通过配置参数的形式来提供具有差异化的功能(如数据库连接模块，接受不同地址连接不同数据库)。

```ts
import { Module, DynamicModule } from '@nestjs/common'
import { DemoService } from './demo.service'

@Module({})
export class DemoModule {
  static register(options): DynamicModule {
    // Mockup对象
    const mockDemoService = {
      test() {
        return 'hello,world'
      },
    }

    const definition = {
      module: DemoModule,
      imports: [],
      controllers: [],
      providers: [
        // 根据配置参数中的isDebug值，来决定使用真正的DemoService
        // 作为资源提供者，还是用mockup对象
        options.isDebug
          ? {
              provide: DemoService,
              useValue: mockDemoService,
            }
          : DemoService,
      ],
      exports: [DemoService],
    }

    //类中如果返回对象是引用类型，实例化时会将该对象赋值给实例对象
    return definition
  }
}

//之后通过类静态方法来传参
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DemoModule } from './demo.module'

@Module({
  // 调用模块中的静态方法获取动态模块
  imports: [DemoModule.register({ isDebug: false })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## DTO

1. 数据访问对象简称 DTO（Data Transfer Object）， 是一组需要跨进程或网络边界传输的聚合数据的简单容器。它不应该包含业务逻辑，并将其行为限制为诸如内部一致性检查和基本验证之类的活动。
2. 在 Nestjs 中，可以使用 TypeScript 接口或简单的类来完成。配合 class-validator 和 class-transformer 可以很方便地验证前端传过来的参数
3. DTO 中的 class-validator 还需要配合 pipe 才能完成校验功能

```ts
//service.ts
import { IsString, IsInt, MinLength, MaxLength } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class CreateCatDto {
  @ApiModelProperty()
  @IsString()
  @MinLength(10, {
    message: 'Name is too short',
  })
  @MaxLength(50, {
    message: 'Name is too long',
  })
  readonly name: string

  @ApiModelProperty()
  @IsInt()
  readonly age: number

  @ApiModelProperty()
  @IsString()
  readonly breed: string
}

//controller.ts,如果 Body 中的参数不符合要求，会直接报 Validation failed 错误。
import { Controller, Post, Body } from '@nestjs/common'
import { CreateCatDto } from './dto'

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat'
  }
}
```

## ORM

1. ORM 是 "对象 - 关系映射"（Object/Relational Mapping） 的缩写，通过实例对象的语法，完成关系型数据库的操作。通过 ORM 就可以用面向对象编程的方式去操作关系型数据库。
   在 Java 中，通常会有 DAO（Data Access Object， 数据访问对象）层，DAO 中包含了各种数据库的操作方法。通过它的方法，对数据库进行相关的操作。DAO 主要作用是分离业务层与数据层，避免业务层与数据层耦合。
   在 Nestjs 中，可以用 TypeORM 作为你的 DAO 层，它支持 MySQL / MariaDB / PostgreSql / CockroachDB / SQLite / Microsoft SQL Server / Oracle / MongoDB / NoSQL。
   在 service 调用 DAO （在 Nestjs 中是各种 ORM 工具或者自己封装的 DAO 层）实现数据库的访问，进行数据的处理整合。
   在 typeORM 中数据库的表对应的就是一个类，通过定义一个类来创建实体。实体（Entity）是一个映射到数据库表（或使用 MongoDB 时的集合）的类，通过 @Entity() 来标记。

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  age: number
}
```

```text
上面代码将创建以下数据库表：
+-------------+--------------+----------------------------+
|                          user                           |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| firstName   | varchar(255) |                            |
| lastName    | varchar(255) |                            |
| isActive    | boolean      |                            |
+-------------+--------------+----------------------------+

```

使用 @InjectRepository() 修饰器注入 对应的 Repository，就可以在这个 Repository 对象上进行数据库的一些操作。

```ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }
}
```

::: right
参考 [一斤代码](https://cloud.tencent.com/developer/article/1532247)  
参考 [tc9011](https://juejin.cn/post/6844903890777817101)
:::
