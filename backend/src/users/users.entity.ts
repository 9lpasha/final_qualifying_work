import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Training } from '../trainings/trainings.entity';
import { Exercise } from '../exercises/exercises.entity';
import { FavoriteExercise } from "../favorite_exercises/favorite_exercises.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100, type: 'varchar' })
  password: string | null;
  @Column({ length: 50, type: 'varchar', unique: true })
  email: string | null;
  @Column({ length: 50, type: 'varchar' })
  name: string;
  @Column({ length: 50, type: 'varchar' })
  surname: string;
  @Column({ length: 50, type: 'varchar', nullable: true })
  lastName: string;
  @Column({ type: 'numeric' })
  aim: 0 | 1 | 2; // похудение -> выбор веса, здоровье, набор массы -> выбор группы мышц,
  @Column({ type: 'numeric' })
  age: number;
  @Column({ type: 'numeric', nullable: true })
  height: number;
  @Column({ type: 'numeric', nullable: true })
  weight: number;
  @Column({ type: 'varchar', nullable: true })
  sex: 'm' | 'w';
  /* Физический уровень, формируемый на основе возраста человека и оценок после тренировок (дефолтный уровень - 5 баллов, максимум 10 баллов) */
  @Column({ type: 'numeric' })
  currentLevel: number;
  // выбраны ли руки
  @Column({ type: 'boolean', nullable: true })
  trainHands: boolean;
  // выбраны ли ноги
  @Column({ type: 'boolean', nullable: true })
  trainLegs: boolean;
  // выбрана ли спина
  @Column({ type: 'boolean', nullable: true })
  trainBack: boolean;
  // выбран ли пресс
  @Column({ type: 'boolean', nullable: true })
  trainPress: boolean;
  // выбрана ли рудь
  @Column({ type: 'boolean', nullable: true })
  trainChest: boolean;
  @Column({ type: 'boolean', nullable: true })
  trainShoulders: boolean;
  @OneToMany(() => FavoriteExercise, (exercise) => exercise.user)
  favoriteExercises: FavoriteExercise[];
  @OneToMany(() => Training, (training) => training.user, { cascade: true })
  trainings: Training[];
}
