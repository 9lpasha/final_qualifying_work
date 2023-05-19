import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FavoriteExercisesService } from './favorite_exercises.service';
import { AuthGuard } from '../Guard/AuthGuard';
import { FavoriteExercise } from './favorite_exercises.entity';

@Controller('favorite-exercises')
export class FavoriteExercisesController {
  constructor(private favoriteExercisesService: FavoriteExercisesService) {}

  //@UseGuards(AuthGuard)
  @Get('by-user')
  async getAllFavoriteExercisesByMuscleGroup(
    @Query('id') id: number,
  ): Promise<FavoriteExercise[]> {
    console.log(id);
    return await this.favoriteExercisesService.getAllFavoriteExercisesByUser(
      id,
    );
  }
}
