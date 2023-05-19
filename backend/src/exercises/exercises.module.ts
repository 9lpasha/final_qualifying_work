import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './exercises.entity';
import { MuscleGroupsService } from '../muscle_groups/muscle_groups.service';
import { MuscleGroup } from '../muscle_groups/muscle_groups.entity';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { Token } from '../token/token.entity';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, MuscleGroup, Token, User])],
  controllers: [ExercisesController],
  providers: [
    ExercisesService,
    MuscleGroupsService,
    TokenService,
    UsersService,
  ],
})
export class ExercisesModule {}
