import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { MuscleGroupsService } from '../muscle_groups/muscle_groups.service';
import { Exercise } from './exercises.entity';
import { MuscleGroup } from '../muscle_groups/muscle_groups.entity';
import { AuthGuard } from '../Guard/AuthGuard';

interface CreateExercisesDto {
  title: string;
  description?: string;
  image: string;
  difficulty: number;
  energy?: number;
  overall_rating?: number;
  muscleGroupId: number;
  target?: string;
  equipment?: string;
}

interface UpdateExercisesDto {
  id: number;
  title?: string;
  description?: string;
  image?: string;
  difficulty?: number;
  energy?: number;
  overall_rating?: number;
  muscleGroupId?: number;
  target?: string;
  equipment?: string;
}

@Controller('exercises')
export class ExercisesController {
  constructor(
    private exercisesService: ExercisesService,
    private muscleGroupsService: MuscleGroupsService,
  ) {}

  //@UseGuards(AuthGuard)
  @Get('one')
  async getExercise(@Query('id') id: number): Promise<Exercise> {
    return await this.exercisesService.getExercise(id);
  }

  //@UseGuards(AuthGuard)
  @Get('all')
  async getAllExercises(): Promise<Exercise[]> {
    return await this.exercisesService.getAllExercises();
  }

  //@UseGuards(AuthGuard)
  @Get('by-muscle-group')
  async getAllExercisesByMuscleGroup(
    @Query('id') id: number,
  ): Promise<Exercise[]> {
    return await this.exercisesService.getAllExercisesByMuscleGroup(id);
  }

  /*//@UseGuards(AuthGuard)
  @Post('create')
  async createExercise(
    @Body() createExercisesInput: CreateExercisesDto,
  ): Promise<Exercise> {
    const muscleGroup = await this.muscleGroupsService.getMuscleGroup(
      createExercisesInput.muscleGroupId,
    );

    return await this.exercisesService.createExercise({
      ...createExercisesInput,
      muscleGroup,
    });
  }*/

  /*//@UseGuards(AuthGuard)
  @Put('update')
  async updateExercise(
    @Body() updateExercisesInput: UpdateExercisesDto,
  ): Promise<Exercise> {
    const relations: { muscleGroup?: MuscleGroup } = {};

    if (updateExercisesInput.muscleGroupId) {
      relations.muscleGroup = await this.muscleGroupsService.getMuscleGroup(
        updateExercisesInput.muscleGroupId,
      );
    }

    return await this.exercisesService.updateExercise({
      ...updateExercisesInput,
      ...relations,
    });
  }*/

  /*//@UseGuards(AuthGuard)
  @Delete('delete')
  async removeExercise(@Query('id') id: number): Promise<number> {
    return await this.exercisesService.removeExercise(id);
  }*/
}
