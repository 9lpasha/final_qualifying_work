import { MuscleGroup } from '../muscle_groups/muscle_groups.entity';

export class CreateExercisesInput {
  title: string;
  description?: string;
  image: string;
  difficulty: number;
  energy?: number;
  overall_rating?: number;
  muscleGroup: MuscleGroup;
  target?: string;
  equipment?: string;
}
