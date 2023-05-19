import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { MuscleGroup } from './muscle_groups.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MuscleGroupsService {
  @InjectRepository(MuscleGroup)
  private readonly muscleGroupRepository: Repository<MuscleGroup>;

  async getMuscleGroup(id: number): Promise<MuscleGroup> {
    try {
      return await this.muscleGroupRepository.findOneOrFail({
        where: { id },
        relations: ['exercises'],
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getAllMuscleGroups(): Promise<MuscleGroup[]> {
    return await this.muscleGroupRepository.find({
      relations: ['exercises'],
    });
  }

  async createMuscleGroup(createMuscleGroupsInput: {
    title: string;
  }): Promise<MuscleGroup> {
    return await this.muscleGroupRepository.save({
      ...createMuscleGroupsInput,
    });
  }

  async updateMuscleGroup(updateMuscleGroupsInput: {
    id: number;
    title?: string;
  }): Promise<MuscleGroup> {
    const criteria = updateMuscleGroupsInput.id;
    delete updateMuscleGroupsInput.id;

    await this.muscleGroupRepository.update(
      { id: criteria },
      { ...updateMuscleGroupsInput },
    );
    return await this.getMuscleGroup(updateMuscleGroupsInput.id);
  }

  async removeMuscleGroup(id: number): Promise<number> {
    await this.muscleGroupRepository.delete(id);
    return id;
  }
}
