import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './exercises.entity';
import { Repository } from 'typeorm';
import { CreateExercisesInput } from './create.exercises.input';
import { UpdateExercisesInput } from './update.exercises.input';

@Injectable()
export class ExercisesService {
  @InjectRepository(Exercise)
  private readonly trainingRepository: Repository<Exercise>;

  async getExercise(id: number): Promise<Exercise> {
    try {
      return await this.trainingRepository.findOneOrFail({
        where: { id },
        relations: ['muscleGroup'],
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getAllExercises(): Promise<Exercise[]> {
    return await this.trainingRepository.find({
      relations: ['muscleGroup'],
    });
  }

  async getAllExercisesByMuscleGroup(id: number): Promise<Exercise[]> {
    return await this.trainingRepository.find({
      where: { muscleGroup: { id } },
      relations: ['muscleGroup'],
    });
  }

  async createExercise(
    createExercisesInput: CreateExercisesInput,
  ): Promise<Exercise> {
    return await this.trainingRepository.save({ ...createExercisesInput });
  }

  async updateExercise(
    updateExercisesInput: UpdateExercisesInput,
  ): Promise<Exercise> {
    const criteria = updateExercisesInput.id;
    delete updateExercisesInput.id;

    await this.trainingRepository.update(
      { id: criteria },
      { ...updateExercisesInput },
    );
    return await this.getExercise(updateExercisesInput.id);
  }

  async removeExercise(id: number): Promise<number> {
    await this.trainingRepository.delete(id);
    return id;
  }
}
