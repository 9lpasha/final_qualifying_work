import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { ExercisesService } from '../exercises/exercises.service';
import { Exercise } from '../exercises/exercises.entity';
import { TokenService } from '../token/token.service';
import { Token } from '../token/token.entity';
import { FavoriteExercise } from '../favorite_exercises/favorite_exercises.entity';
import { FavoriteExercisesService } from '../favorite_exercises/favorite_exercises.service';
import { Training } from '../trainings/trainings.entity';
import { ExerciseInTraining } from '../exercise_in_training/exercise_in_training.entity';
import { TrainingsService } from '../trainings/trainings.service';
import { ExerciseInTrainingService } from '../exercise_in_training/exercise_in_training.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Exercise,
      Token,
      FavoriteExercise,
      Training,
      ExerciseInTraining,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ExercisesService,
    TokenService,
    FavoriteExercisesService,
    TrainingsService,
    ExerciseInTrainingService,
  ],
})
export class UsersModule {}
