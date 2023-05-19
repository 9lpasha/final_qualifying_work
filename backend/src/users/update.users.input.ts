import { Exercise } from "../exercises/exercises.entity";

export class UpdateUsersInput {
  id: number;
  password?: string;
  email?: string;
  name?: string;
  surname?: string;
  lastName?: string;
  aim?: 0 | 1 | 2; // похудение -> выбор веса, здоровье, набор массы -> выбор группы мышц,
  age?: number;
  height?: number;
  weight?: number;
  sex?: 'm' | 'w';
  /* Физический уровень, формируемый на основе возраста человека и оценок после тренировок (дефолтный уровень - 5 баллов, максимум 10 баллов) */
  currentLevel?: number;
  trainHands?: boolean;
  trainLegs?: boolean;
  trainBack?: boolean;
  trainPress?: boolean;
  trainChest?: boolean;
  trainShoulders?: boolean;
  favoriteExercises?: Exercise[];
}
