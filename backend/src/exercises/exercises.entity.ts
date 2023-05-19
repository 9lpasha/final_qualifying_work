import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MuscleGroup } from '../muscle_groups/muscle_groups.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100, type: 'varchar' })
  title: string;
  @Column({ type: 'varchar', nullable: true })
  description: string;
  @Column({ type: 'varchar' })
  image: string;
  @Column({ type: 'numeric', nullable: true })
  difficulty: number;
  @Column({ type: 'numeric', nullable: true })
  energy: number;
  @Column({ type: 'float', nullable: true })
  overall_rating: number;
  @Column({ type: 'varchar', nullable: true })
  target: string;
  @Column({ type: 'varchar', nullable: true })
  equipment: string;
  @ManyToOne(() => MuscleGroup, (muscleGroup) => muscleGroup.exercises)
  muscleGroup: MuscleGroup;
}
