import { ExerciseRepository } from "../domain/ExerciseRepository";

export class GradeAnswerUseCase {
  constructor(readonly exerciseRepository: ExerciseRepository) {}

  async run(studentAnswer: string) {
    const realAnswer = await this.exerciseRepository.gradeAnswer(studentAnswer);
    return realAnswer;
  }
}
