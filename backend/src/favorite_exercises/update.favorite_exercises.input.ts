import { Exercise } from '../exercises/exercises.entity';
import { User } from '../users/users.entity';

export class UpdateFavoriteExercisesInput {
  id: number;
  exercise?: Exercise;
  user?: User;
}
