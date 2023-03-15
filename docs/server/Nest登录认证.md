---
title: Nest登录认证
date: 2021-03-27 19:04:43
categories:
  - Nest
tags:
  - Nest
  - Node
isShowComments: true
publish: true
---

通常认证要么基于 Session，要么基于 Token。这里就以基于 Token 的 JWT（JSON Web Token） 方式进行用户认证。

1. 安装相关依赖

   ```dos
   npm install --save @nestjs/passport passport @nestjs/jwt passport-jwt
   ```

2. 创建 jwt.strategy.ts，用来验证 token，当 token 有效时，允许进一步处理请求，否则返回 401(Unauthorized)

   ```ts
   import { ExtractJwt, Strategy } from 'passport-jwt'
   import { PassportStrategy } from '@nestjs/passport'
   import { Injectable, UnauthorizedException } from '@nestjs/common'
   import config from '../../config'
   import { UserEntity } from '../entities/user.entity'
   import { AuthService } from './auth.service'

   @Injectable()
   export class JwtStrategy extends PassportStrategy(Strategy) {
     constructor(private readonly authService: AuthService) {
       super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: config.jwt.secret,
       })
     }

     async validate(payload: UserEntity) {
       const user = await this.authService.validateUser(payload)
       if (!user) {
         throw new UnauthorizedException('身份验证失败')
       }
       return user
     }
   }
   ```

3. 创建 auth.service.ts，上面的 jwt.strategy.ts 会使用这个服务校验 token，并且提供了创建 token 的方法：

   ```ts
   import { JwtService } from '@nestjs/jwt'
   import { Injectable } from '@nestjs/common'
   import { UserEntity } from '../entities/user.entity'
   import { InjectRepository } from '@nestjs/typeorm'
   import { Repository } from 'typeorm'
   import { Token } from './auth.interface'
   import config from '../../config'

   @Injectable()
   export class AuthService {
     constructor(
       @InjectRepository(UserEntity)
       private readonly userRepository: Repository<UserEntity>,
       private readonly jwtService: JwtService
     ) {}

     createToken(email: string): Token {
       const accessToken = this.jwtService.sign({ email })
       return {
         expires_in: config.jwt.signOptions.expiresIn,
         access_token: accessToken,
       }
     }

     async validateUser(payload: UserEntity): Promise<any> {
       return await this.userRepository.find({ email: payload.email })
     }
   }
   ```

4. 作为服务在对应的 module 中注册，并且引入 PassportModule 和 JwtModule：

   ```ts
   import { Module } from '@nestjs/common'
   import { AuthService } from './auth/auth.service'
   import { PassportModule } from '@nestjs/passport'
   import { JwtModule } from '@nestjs/jwt'
   import { JwtStrategy } from './auth/jwt.strategy'
   import config from '../config'

   @Module({
     imports: [PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register(config.jwt)],
     providers: [AuthService, JwtStrategy],
     exports: [],
   })
   export class FeaturesModule {}
   ```

5. 使用 @UseGuards(AuthGuard()) 来对需要认证的 API 进行身份校验：

   ```ts
   import {
     Body,
     ClassSerializerInterceptor,
     Controller,
     Get,
     Param,
     Post,
     UseGuards,
     UseInterceptors,
   } from '@nestjs/common'

   import { CatsService } from './cats.service'
   import { CreateCatDto } from './cat.dto'
   import { CatEntity } from '../entities/cat.entity'
   import { AuthGuard } from '@nestjs/passport'

   @Controller('cats')
   @UseGuards(AuthGuard())
   export class CatsController {
     constructor(private readonly catsService: CatsService) {}

     @Get(':id')
     @UseInterceptors(ClassSerializerInterceptor)
     findOne(@Param('id') id: string): Promise<Array<Partial<CatEntity>>> {
       return this.catsService.getCat(id)
     }

     @Post()
     create(@Body() createCatDto: CreateCatDto): Promise<void> {
       return this.catsService.createCat(createCatDto)
     }
   }
   ```

6. 通过 Postman 模拟请求时，如果没有带上 token，就会返回下面结果

```json
{
  "message": {
    "statusCode": 401,
    "error": "Unauthorized"
  },
  "status": 1
}
```

::: right
参考 [tc9011](https://juejin.cn/post/6844903903792742407#heading-2)
:::
