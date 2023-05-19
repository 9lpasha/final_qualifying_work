import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Training } from '../trainings/trainings.entity';
import { Exercise } from '../exercises/exercises.entity';

@Entity('exercises_in_training')
export class ExerciseInTraining {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Exercise)
  exercise: Exercise;
  @ManyToOne(() => Training, (training) => training.exercises)
  training: Training;
}
