import { Exercise } from '../exercises/exercises.entity';
import { User } from '../users/users.entity';

export class CreateFavoriteExercisesInput {
  exercise: Exercise;
  user: User;
}
