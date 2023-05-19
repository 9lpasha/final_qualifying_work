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
import { MuscleGroup } from './muscle_groups.entity';
import { MuscleGroupsService } from './muscle_groups.service';
import { AuthGuard } from '../Guard/AuthGuard';

@Controller('muscle-groups')
export class MuscleGroupsController {
  constructor(private muscleGroupsService: MuscleGroupsService) {}

  //@UseGuards(AuthGuard)
  @Get('one')
  async getMuscleGroup(@Query('id') id: number): Promise<MuscleGroup> {
    return await this.muscleGroupsService.getMuscleGroup(id);
  }

  //@UseGuards(AuthGuard)
  @Get('all')
  async getAllMuscleGroups(): Promise<MuscleGroup[]> {
    return await this.muscleGroupsService.getAllMuscleGroups();
  }

  /*//@UseGuards(AuthGuard)
  @Post('create')
  async createMuscleGroup(
    @Body() createMuscleGroupsInput: { title: string },
  ): Promise<MuscleGroup> {
    return await this.muscleGroupsService.createMuscleGroup({
      ...createMuscleGroupsInput,
    });
  }*/

  /*//@UseGuards(AuthGuard)
  @Put('update')
  async updateMuscleGroup(
    @Body() updateMuscleGroupsInput: { id: number; title?: string },
  ): Promise<MuscleGroup> {
    return await this.muscleGroupsService.updateMuscleGroup({
      ...updateMuscleGroupsInput,
    });
  }*/

  /*//@UseGuards(AuthGuard)
  @Delete('delete')
  async removeMuscleGroup(@Query('id') id: number): Promise<number> {
    return await this.muscleGroupsService.removeMuscleGroup(id);
  }*/
}
