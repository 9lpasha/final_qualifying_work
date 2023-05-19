import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Exercise } from '../exercises/exercises.entity';

@Entity('muscle_groups')
export class MuscleGroup {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  title: string;
  @OneToMany(() => Exercise, (exercise) => exercise.muscleGroup, {
    cascade: true,
  })
  exercises: Exercise[];
}
