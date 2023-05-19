import { MuscleGroup } from '../muscle_groups/muscle_groups.entity';

export class UpdateExercisesInput {
  id: number;
  title?: string;
  description?: string;
  image?: string;
  difficulty?: number;
  energy?: number;
  overall_rating?: number;
  muscleGroup?: MuscleGroup;
  target?: string;
  equipment?: string;
}
