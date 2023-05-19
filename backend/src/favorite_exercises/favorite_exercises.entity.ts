import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exercise } from '../exercises/exercises.entity';
import { User } from '../users/users.entity';

@Entity('favorite_exercises')
export class FavoriteExercise {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Exercise)
  exercise: Exercise;
  @ManyToOne(() => User, (user) => user.favoriteExercises)
  user: User;
}
