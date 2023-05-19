import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { sign } from 'jsonwebtoken';

@Injectable()
export class TokenService {
  @InjectRepository(Token)
  private readonly tokenRepository: Repository<Token>;

  async getToken(token: string): Promise<Token> {
    try {
      return await this.tokenRepository.findOneOrFail({ where: { token } });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async generateToken(email: string): Promise<string> {
    return await sign({ email }, process.env.SECRET, { expiresIn: '90d' });
  }

  async createToken(token: string): Promise<Token> {
    return await this.tokenRepository.save({ token });
  }

  async removeToken(token: string): Promise<string> {
    await this.tokenRepository.delete({ token });
    return token;
  }
}
