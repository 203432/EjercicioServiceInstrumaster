import { Answer } from "./Answer";

export interface AnswerRepository {
  createAnswer(answer: Answer): Promise<Answer | null>;
  getAllAnswer(): Promise<Answer[] | null>;
  getFourAnswer(exerciseId: string): Promise<Answer[] | null>;
  getAnswersByExerciseId(exerciseId: string): Promise<Answer[] | null>;
  getAnswerById(id: string): Promise<Answer | null>;
}
