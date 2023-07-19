import { Exercise } from "../domain/Exercise";
import { ExerciseRepository } from "../domain/ExerciseRepository";
import { pool } from "./postgres/database";

export class PostgresExerciseRepository implements ExerciseRepository {
  async createExercise(exercise: Exercise): Promise<Exercise | null> {
    await pool.query(
      'INSERT INTO public."Exercise" (id_lesson, multimedia, question, stars, exercise_order) VALUES ($1, $2, $3, $4, $5)',
      [
        exercise.id_lesson,
        exercise.multimedia,
        exercise.question,
        exercise.stars,
        exercise.exercise_order,
      ]
    );

    return exercise;
  }
  async getAllExercises(): Promise<Exercise[] | null> {
    try {
      const result = await pool.query('SELECT * FROM public."Exercise"');
      const exercises = result.rows.map((row: any) => {
        return new Exercise(
          row.id,
          row.id_lesson,
          row.multimedia,
          row.question,
          row.stars,
          row.exercise_order
        );
      });
      return exercises;
    } catch (error) {
      console.error("Error al obtener todas las lecciones:", error);
      return []; // En caso de error, devolver una lista vacía
    }
  }
  async getExercisesByLessonId(lessonId: string): Promise<Exercise[] | null> {
    console.log("Buscando las leccion con id " + lessonId);
    const query = await pool.query(
      'SELECT * FROM public."Exercise" WHERE id_lesson = $1',
      [lessonId]
    );

    if (query.rows.length == 0) {
      return null;
    }

    const exercises: Exercise[] = query.rows;

    return exercises;
  }
  async getExerciseById(id: string): Promise<Exercise | null> {
    console.log("Buscando la leccion con id " + id);
    const query = await pool.query(
      'SELECT * FROM public."Exercise" WHERE id = $1',
      [id]
    );

    if (query.rows.length == 0) {
      return null;
    }

    const exercise: Exercise = query.rows[0];

    return exercise;
  }
  gradeAnswer(studentAnswer: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  addStars(): Promise<number | null> {
    throw new Error("Method not implemented.");
  }
}
