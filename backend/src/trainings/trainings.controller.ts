import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query, UseGuards
} from "@nestjs/common";
import { TrainingsService } from './trainings.service';
import { Training } from './trainings.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { ExercisesService } from '../exercises/exercises.service';
import { AuthGuard } from "../Guard/AuthGuard";

interface CreateTrainingsDto {
  rating?: number;
  difficulty?: number;
  datetime_finish: Date;
  userId: number;
}

interface UpdateTrainingsDto {
  id: number;
  rating?: number;
  difficulty?: number;
  datetime_finish?: Date;
  userId?: number;
}

@Controller('trainings')
export class TrainingsController {
  constructor(
    private trainingsService: TrainingsService,
    private usersService: UsersService,
    private exercisesService: ExercisesService,
  ) {}

  //@UseGuards(AuthGuard)
  @Get('one')
  async getTraining(@Query('id') id: number): Promise<Training> {
    return await this.trainingsService.getTraining(id);
  }

  /*//@UseGuards(AuthGuard)
  @Get('all')
  async getAllTrainings(): Promise<Training[]> {
    return await this.trainingsService.getAllTrainings();
  }*/

  //@UseGuards(AuthGuard)
  @Get('by-user')
  async getAllTrainingsByUser(@Query('id') id: number): Promise<Training[]> {
    return await this.trainingsService.getAllTrainingsByUser(id);
  }

  /*//@UseGuards(AuthGuard)
  @Post('create')
  async createTraining(
    @Body() createTrainingsInput: CreateTrainingsDto,
  ): Promise<Training> {
    const user = await this.usersService.getUser(createTrainingsInput.userId);

    return await this.trainingsService.createTraining({
      ...createTrainingsInput,
      user,
    });
  }*/

  //@UseGuards(AuthGuard)
  @Put('update')
  async updateTraining(
    @Body() updateTrainingsInput: UpdateTrainingsDto,
  ): Promise<Training> {
    const relations: { user?: User } = {};

    if (updateTrainingsInput.userId) {
      relations.user = await this.usersService.getUser(updateTrainingsInput.id);
    }

    return await this.trainingsService.updateTraining({
      ...updateTrainingsInput,
      ...relations,
    });
  }

  //@UseGuards(AuthGuard)
  @Delete('delete')
  async removeTraining(@Query('id') id: number): Promise<number> {
    return await this.trainingsService.removeTraining(id);
  }

  /*//@UseGuards(AuthGuard)
  @Post('addExercise')
  async addExercise(
    @Query('trainingId') trainingId: number,
    @Query('exerciseId') exerciseId: number,
  ): Promise<Training> {
    const training = await this.getTraining(trainingId);
    const exercise = await this.exercisesService.getExercise(exerciseId);

    return await this.trainingsService.updateTraining({
      id: trainingId,
      exercises: [...training.exercises, exercise],
    });
  }*/
}
