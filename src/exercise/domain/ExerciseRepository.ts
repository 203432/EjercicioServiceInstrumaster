import { Exercise } from "./Exercise";

export interface ExerciseRepository {
  createExercise(exercise: Exercise): Promise<Exercise | null>;
  getAllExercises(): Promise<Exercise[] | null>;
  getExercisesByLessonId(lessonId: string): Promise<Exercise[] | null>;
  getExerciseById(id: string): Promise<Exercise | null>;
  gradeAnswer(studentAnswer: string): Promise<string | null>;
  addStars(): Promise<number | null>;
}
