import { AnswerRepository } from "../domain/AnswerRepository";

export class GetAllAnswerUseCase {
  constructor(readonly answerRepository: AnswerRepository) {}

  async run() {
    const answers = await this.answerRepository.getAllAnswer();
    return answers;
  }
}
