import { Module } from '@nestjs/common';
import { MuscleGroupsController } from './muscle_groups.controller';
import { MuscleGroupsService } from './muscle_groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuscleGroup } from './muscle_groups.entity';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { Token } from '../token/token.entity';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MuscleGroup, Token, User])],
  controllers: [MuscleGroupsController],
  providers: [MuscleGroupsService, TokenService, UsersService],
})
export class MuscleGroupsModule {}
