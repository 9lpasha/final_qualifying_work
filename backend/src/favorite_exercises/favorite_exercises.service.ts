import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteExercise } from './favorite_exercises.entity';
import { CreateFavoriteExercisesInput } from './create.favorite_exercises.input';
import { UpdateFavoriteExercisesInput } from './update.favorite_exercises.input';

@Injectable()
export class FavoriteExercisesService {
  @InjectRepository(FavoriteExercise)
  private readonly trainingRepository: Repository<FavoriteExercise>;

  async getFavoriteExercise(id: number): Promise<FavoriteExercise> {
    try {
      return await this.trainingRepository.findOneOrFail({
        where: { id },
        relations: ['exercise', 'user'],
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getFavoriteExerciseByUserAndExercise(
    userId: number,
    exerciseId: number,
  ): Promise<FavoriteExercise> {
    try {
      return await this.trainingRepository.findOneOrFail({
        where: { user: { id: userId }, exercise: { id: exerciseId } },
        relations: ['exercise', 'user'],
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getAllFavoriteExercises(): Promise<FavoriteExercise[]> {
    return await this.trainingRepository.find({
      relations: ['exercise', 'user'],
    });
  }

  async getAllFavoriteExercisesByUser(id: number): Promise<FavoriteExercise[]> {
    return await this.trainingRepository.find({
      where: { user: { id } },
      relations: ['exercise', 'user'],
    });
  }

  async createFavoriteExercise(
    createFavoriteExercisesInput: CreateFavoriteExercisesInput,
  ): Promise<FavoriteExercise> {
    return await this.trainingRepository.save({
      ...createFavoriteExercisesInput,
    });
  }

  async updateFavoriteExercise(
    updateFavoriteExercisesInput: UpdateFavoriteExercisesInput,
  ): Promise<FavoriteExercise> {
    const criteria = updateFavoriteExercisesInput.id;
    delete updateFavoriteExercisesInput.id;

    await this.trainingRepository.update(
      { id: criteria },
      { ...updateFavoriteExercisesInput },
    );
    return await this.getFavoriteExercise(updateFavoriteExercisesInput.id);
  }

  async removeFavoriteExercise(id: number): Promise<number> {
    await this.trainingRepository.delete(id);
    return id;
  }
}
