import { AnswerRepository } from "../domain/AnswerRepository";

export class GetAnswerByExerciseIdUseCase {
  constructor(readonly answerRepository: AnswerRepository) {}

  async run(exerciseId: string) {
    const answers = await this.answerRepository.getAnswersByExerciseId(
      exerciseId
    );
    return answers;
  }
}
