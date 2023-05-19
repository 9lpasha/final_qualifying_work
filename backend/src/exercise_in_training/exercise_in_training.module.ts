import { Module } from '@nestjs/common';
import { ExerciseInTrainingController } from './exercise_in_training.controller';
import { ExerciseInTrainingService } from './exercise_in_training.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseInTraining } from './exercise_in_training.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseInTraining])],
  controllers: [ExerciseInTrainingController],
  providers: [ExerciseInTrainingService],
})
export class ExerciseInTrainingModule {}
