import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UsersModule } from './users/users.module';
import { ExercisesModule } from './exercises/exercises.module';
import { MuscleGroupsModule } from './muscle_groups/muscle_groups.module';
import { TrainingsModule } from './trainings/trainings.module';
import { FavoriteExercisesModule } from './favorite_exercises/favorite_exercises.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { ExerciseInTrainingModule } from './exercise_in_training/exercise_in_training.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    ExercisesModule,
    MuscleGroupsModule,
    TrainingsModule,
    FavoriteExercisesModule,
    AuthModule,
    TokenModule,
    ExerciseInTrainingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
