import { pool } from "../../exercise/infrastructure/postgres/database";
import { Answer } from "../domain/Answer";
import { AnswerRepository } from "../domain/AnswerRepository";

export class PostgresAnswerRepository implements AnswerRepository {
  async getFourAnswer(exerciseId: string): Promise<Answer[] | null> {
    console.log("Buscando las leccion con id " + exerciseId);
    const query = await pool.query(
      'SELECT * FROM public."Answer" WHERE id_exercise = $1',
      [exerciseId]
    );

    if (query.rows.length == 0) {
      return null;
    }

    const answers: Answer[] = query.rows;

    return answers;
  }
  async createAnswer(answer: Answer): Promise<Answer | null> {
    await pool.query(
      'INSERT INTO public."Answer" (id_exercise, multimedia, answer, is_correct) VALUES ($1, $2, $3, $4)',
      [answer.id_exercise, answer.multimedia, answer.answer, answer.is_correct]
    );

    return answer;
  }
  async getAllAnswer(): Promise<Answer[] | null> {
    try {
      const result = await pool.query('SELECT * FROM public."Answer"');
      const answers = result.rows.map((row: any) => {
        return new Answer(
          row.id,
          row.id_exercise,
          row.multimedia,
          row.answer,
          row.is_correct
        );
      });
      return answers;
    } catch (error) {
      console.error("Error al obtener todas las lecciones:", error);
      return []; // En caso de error, devolver una lista vacía
    }
  }
  async getAnswersByExerciseId(exerciseId: string): Promise<Answer[] | null> {
    console.log("Buscando las leccion con id " + exerciseId);
    const query = await pool.query(
      'SELECT * FROM public."Answer" WHERE id_exercise = $1',
      [exerciseId]
    );

    if (query.rows.length == 0) {
      return null;
    }

    const answers: Answer[] = query.rows;

    return answers;
  }
  async getAnswerById(id: string): Promise<Answer | null> {
    console.log("Buscando la respuesta con id " + id);
    const query = await pool.query(
      'SELECT * FROM public."Answer" WHERE id = $1',
      [id]
    );

    if (query.rows.length == 0) {
      return null;
    }

    const exercise: Answer = query.rows[0];

    return exercise;
  }
}
