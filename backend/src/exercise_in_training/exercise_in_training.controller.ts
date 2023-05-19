import { Controller, Get } from '@nestjs/common';
import { ExerciseInTrainingService } from './exercise_in_training.service';
import { ExerciseInTraining } from './exercise_in_training.entity';

@Controller('exercise-in-training')
export class ExerciseInTrainingController {
  constructor(private exerciseInTrainingService: ExerciseInTrainingService) {}

  //@UseGuards(AuthGuard)
  @Get('all')
  async getAllExercises(): Promise<ExerciseInTraining[]> {
    return await this.exerciseInTrainingService.getAllExercise();
  }
}
