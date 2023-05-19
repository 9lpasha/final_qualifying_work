import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseInTraining } from './exercise_in_training.entity';
import { Repository } from 'typeorm';
import { Exercise } from '../exercises/exercises.entity';
import { Training } from '../trainings/trainings.entity';

@Injectable()
export class ExerciseInTrainingService {
  @InjectRepository(ExerciseInTraining)
  private readonly trainingRepository: Repository<ExerciseInTraining>;

  async getAllExercise(): Promise<ExerciseInTraining[]> {
    return await this.trainingRepository.find({
      relations: ['training', 'exercise'],
    });
  }

  async createExercise(
    training: Training,
    exercise: Exercise,
  ): Promise<ExerciseInTraining> {
    return await this.trainingRepository.save({
      training,
      exercise,
    });
  }

  async removeExercise(id: number): Promise<number> {
    await this.trainingRepository.delete(id);
    return id;
  }
}
