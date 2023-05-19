import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainingsInput } from './create.trainings.input';
import { UpdateTrainingsInput } from './update.trainings.input';
import { Training } from './trainings.entity';

@Injectable()
export class TrainingsService {
  @InjectRepository(Training)
  private readonly trainingRepository: Repository<Training>;

  async getTraining(id: number): Promise<Training> {
    try {
      return await this.trainingRepository.findOneOrFail({
        where: { id },
        relations: ['exercises.exercise', 'user'],
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getAllTrainings(): Promise<Training[]> {
    return await this.trainingRepository.find({
      relations: ['exercises.exercise', 'user'],
    });
  }

  async getAllTrainingsByUser(id: number): Promise<Training[]> {
    return await this.trainingRepository.find({
      where: { user: { id } },
      relations: ['exercises.exercise', 'user'],
    });
  }

  async createTraining(
    createTrainingsInput: CreateTrainingsInput,
  ): Promise<Training> {
    return await this.trainingRepository.save({ ...createTrainingsInput });
  }

  async updateTraining(
    updateTrainingsInput: UpdateTrainingsInput,
  ): Promise<Training> {
    const prevTraining = await this.getTraining(updateTrainingsInput.id);

    return await this.trainingRepository.save(
      {
        ...prevTraining,
        ...updateTrainingsInput,
      },
      { reload: true },
    );
  }

  async removeTraining(id: number): Promise<number> {
    await this.trainingRepository.delete(id);
    return id;
  }
}
