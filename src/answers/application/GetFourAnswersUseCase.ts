import { AnswerRepository } from "../domain/AnswerRepository";

export class GetFourAnswersUseCase {
  constructor(readonly answerRepository: AnswerRepository) {}

  async run(exerciseid: string) {
    const answers = await this.answerRepository.getFourAnswer(exerciseid);
    return answers;
  }
}
