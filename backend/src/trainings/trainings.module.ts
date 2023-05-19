import { Module } from '@nestjs/common';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './trainings.entity';
import { UsersService } from '../users/users.service';
import { ExercisesService } from '../exercises/exercises.service';
import { User } from '../users/users.entity';
import { Exercise } from '../exercises/exercises.entity';
import { TokenService } from '../token/token.service';
import { Token } from '../token/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Training, User, Exercise, Token])],
  controllers: [TrainingsController],
  providers: [TrainingsService, UsersService, ExercisesService, TokenService],
})
export class TrainingsModule {}
