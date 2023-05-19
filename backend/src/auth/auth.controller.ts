import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUsersInput } from '../users/create.users.input';
import { hash, compare } from 'bcrypt';
import { TokenService } from '../token/token.service';
import { Request, Response } from 'express';
import { configService } from '../config/config.service';
import { User } from '../users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
  ) {}

  @Post('registration')
  async registration(
    @Body() createUsersInput: CreateUsersInput,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const user = await this.userService.getUserByEmail(createUsersInput.email);

    if (user) {
      throw new BadRequestException('Email is already in use');
    }

    const createdUser = await this.userService.createUser(createUsersInput);

    const token = await this.tokenService.generateToken(createdUser.email);

    await this.tokenService.createToken(token);
    response.cookie('token', token);

    return 'ok';
  }

  @Post('in')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
    @Req() req: Request,
  ): Promise<User> {
    const email = body.email;
    const password = body.password;
    const user = await this.userService.getUserByEmail(email);
    if (!email || !password) {
      throw new BadRequestException('Email or password not transmitted');
    }

    if (!user) {
      throw new BadRequestException('Email is invalid');
    }
    try {
      if (!(await compare(password, user.password))) {
        throw new UnauthorizedException('Password is invalid');
      }
    } catch (e) {
      throw new UnauthorizedException('Password is invalid');
    }

    const token = await this.tokenService.generateToken(user.email);

    await this.tokenService.createToken(token);
    response.cookie('token', token, configService.cookieOptions());

    return {
      ...user,
      password: null,
    };
  }

  @Post('out')
  async logout(
    @Query('email') email: string,
    @Res({ passthrough: true }) response: Response,
    @Req() req: Request,
  ): Promise<string> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Email is invalid');
    }

    await this.tokenService.removeToken(req.cookies.token);
    response.cookie('token', '', configService.cookieOptions());

    return 'ok';
  }
}
