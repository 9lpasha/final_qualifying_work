import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne, OneToMany
} from "typeorm";
import { User } from '../users/users.entity';
import { ExerciseInTraining } from '../exercise_in_training/exercise_in_training.entity';

@Entity('trainings')
export class Training {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'numeric', nullable: true })
  rating?: number;
  @Column({ type: 'numeric', nullable: true })
  difficulty?: number;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  datetime_start: Date;
  @Column({ type: 'timestamp with time zone', nullable: true })
  datetime_finish?: Date;
  @OneToMany(() => ExerciseInTraining, (exercise) => exercise.training)
  exercises: ExerciseInTraining[];
  @ManyToOne(() => User, (user) => user.trainings)
  user: User;
}
