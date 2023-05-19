import { Module } from '@nestjs/common';
import { FavoriteExercisesController } from './favorite_exercises.controller';
import { FavoriteExercisesService } from './favorite_exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteExercise } from './favorite_exercises.entity';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { Token } from '../token/token.entity';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteExercise, Token, User])],
  controllers: [FavoriteExercisesController],
  providers: [FavoriteExercisesService, TokenService, UsersService],
})
export class FavoriteExercisesModule {}
