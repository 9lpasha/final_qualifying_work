import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Token } from '../token/token.entity';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, TokenService],
})
export class AuthModule {}
