import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UpdateUsersInput } from './update.users.input';
import { ExercisesService } from '../exercises/exercises.service';
import { AuthGuard } from '../Guard/AuthGuard';
import { verify } from 'jsonwebtoken';
import { raw, Request } from 'express';
import axios from 'axios';
import { Exercise } from '../exercises/exercises.entity';
import { FavoriteExercise } from '../favorite_exercises/favorite_exercises.entity';
import { FavoriteExercisesService } from '../favorite_exercises/favorite_exercises.service';
import { TrainingsService } from '../trainings/trainings.service';
import { ExerciseInTrainingService } from '../exercise_in_training/exercise_in_training.service';
import { Training } from '../trainings/trainings.entity';

const aims = ['weight loss', 'health', 'muscle group'];

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private exercisesService: ExercisesService,
    private favoriteExercisesService: FavoriteExercisesService,
    private trainingsService: TrainingsService,
    private exerciseInTrainingService: ExerciseInTrainingService,
  ) {}

  //@UseGuards(AuthGuard)
  @Get('one')
  async getUser(@Query('id') id: number): Promise<User> {
    const user = await this.usersService.getUser(id);
    return {
      ...user,
      password: null,
    };
  }

  //@UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() request: Request): Promise<User> {
    const email = await verify(request.cookies.token, process.env.SECRET);
    const user = await this.usersService.getUserByEmail(email.email);

    return {
      ...user,
      password: null,
    };
  }

  /*//@UseGuards(AuthGuard)
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }*/

  /* //@UseGuards(AuthGuard)
  @Post('create')
  async createUser(@Body() createUsersInput: CreateUsersInput): Promise<User> {
    return await this.usersService.createUser(createUsersInput);
  }*/

  //@UseGuards(AuthGuard)
  @Put('update')
  async updateUser(@Body() updateUsersInput: UpdateUsersInput): Promise<User> {
    const user = await this.usersService.updateUser(updateUsersInput);
    return {
      ...user,
      password: null,
    };
  }

  //@UseGuards(AuthGuard)
  @Delete('delete')
  async removeUser(@Query('id') id: number): Promise<number> {
    return await this.usersService.removeUser(id);
  }

  //@UseGuards(AuthGuard)
  @Post('add-favorite-exercise')
  async addFavoriteExercise(
    @Query('userId') userId: number,
    @Query('exerciseId') exerciseId: number,
  ): Promise<User> {
    const user = await this.usersService.getUser(userId);
    const exercise = await this.exercisesService.getExercise(exerciseId);
    const favoriteExercise = user.favoriteExercises.find(
      (item) => item.exercise.id == exercise.id,
    );
    if (!favoriteExercise) {
      await this.favoriteExercisesService.createFavoriteExercise({
        user,
        exercise,
      });
    } else {
      throw new BadRequestException(
        'This user already has such a favorite exercise',
      );
    }
    const newUser = await this.usersService.getUser(userId);
    return {
      ...newUser,
      password: null,
    };
  }

  //@UseGuards(AuthGuard)
  @Post('remove-favorite-exercise')
  async removeFavoriteExercise(
    @Query('userId') userId: number,
    @Query('exerciseId') exerciseId: number,
  ): Promise<User> {
    const user = await this.usersService.getUser(userId);
    const exercise = await this.exercisesService.getExercise(exerciseId);
    const favoriteExercise = user.favoriteExercises.find(
      (item) => item.exercise.id == exercise.id,
    );
    console.log(favoriteExercise);
    if (favoriteExercise)
      await this.favoriteExercisesService.removeFavoriteExercise(
        favoriteExercise.id,
      );
    else
      throw new NotFoundException("This user hasn't such a favorite exercise");
    const newUser = await this.usersService.getUser(user.id);
    return {
      ...newUser,
      password: null,
    };
  }

  @Post('rec-training')
  async recommendTraining(
    @Query('userId') userId: number,
    @Body() body: { difficulty: number; rating: number },
  ): Promise<Training> {
    const user = await this.usersService.getUser(userId);
    const exercises = await this.exercisesService.getAllExercises();
    const recExercisesNumbers = await axios.post(
      'http://127.0.0.1:5000/lightfm_new_user_rec',
      {
        id: user.id,
        sex: user.sex,
        aim: aims[user.aim],
        age: Number(user.age),
        height: Number(user.height),
        weight: Number(user.weight),
        level: Number(user.currentLevel),
        trainHands: user.aim == 2 ? Number(user.trainHands) : 0,
        trainLegs: user.aim == 2 ? Number(user.trainLegs) : 0,
        trainBack: user.aim == 2 ? Number(user.trainBack) : 0,
        trainPress: user.aim == 2 ? Number(user.trainPress) : 0,
        trainChest: user.aim == 2 ? Number(user.trainChest) : 0,
        trainShoulders: user.aim == 2 ? Number(user.trainShoulders) : 0,
      },
    );

    console.log(recExercisesNumbers.data);

    await this.usersService.updateUser({
      id: user.id,
      currentLevel:
        body.difficulty == 0
          ? user.currentLevel == 10
            ? 10
            : Number(user.currentLevel) + 1
          : body.difficulty == 2
          ? user.currentLevel == 1
            ? 1
            : Number(user.currentLevel) - 1
          : Number(user.currentLevel),
    });

    const trainings = await this.trainingsService.getAllTrainingsByUser(
      user.id,
    );
    let lastTraining: Training = null;
    if (trainings.length)
      lastTraining = trainings.sort((a, b) =>
        a.datetime_start > b.datetime_start ? -1 : 1,
      )[0];

    if (lastTraining)
      await this.trainingsService.updateTraining({
        id: lastTraining.id,
        difficulty: body.difficulty,
        rating: body.rating,
      });

    const training = await this.trainingsService.createTraining({ user });
    const exerciseInNewTraining = exercises
      .filter((item) => {
        if (user.aim == 0) return item.muscleGroup.title === 'cardio';
        else return recExercisesNumbers.data.includes(item.id - 40);
      })
      .slice(0, 6);
    for (const exercise of exerciseInNewTraining) {
      await this.exerciseInTrainingService.createExercise(training, exercise);
    }

    return await this.trainingsService.getTraining(training.id);
  }

  @Get('rec-training')
  async currentTraining(@Query('userId') userId: number): Promise<Training> {
    const user = await this.usersService.getUser(userId);
    const trainings = await this.trainingsService.getAllTrainingsByUser(
      user.id,
    );
    if (trainings.length)
      return trainings.sort((a, b) =>
        a.datetime_start > b.datetime_start ? -1 : 1,
      )[0];
    else return this.recommendTraining(userId, { difficulty: 0, rating: 0 });
  }
}
