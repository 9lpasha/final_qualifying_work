import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { verify } from 'jsonwebtoken';
import { configService } from '../config/config.service';

@Injectable()
export class AuthGuard {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const cookies = request.cookies;

    try {
      if (!cookies.token) throw new UnauthorizedException();
      if (await verify(cookies.token, process.env.SECRET)) {
        const email = await verify(cookies.token, process.env.SECRET);
        const newToken = await this.tokenService.generateToken(email.email);
        response.cookie('token', newToken, configService.cookieOptions());
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
