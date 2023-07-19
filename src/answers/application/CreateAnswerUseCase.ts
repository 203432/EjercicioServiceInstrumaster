import { Answer } from "../domain/Answer";
import { AnswerRepository } from "../domain/AnswerRepository";

export class CreateAnswerUseCase {
  constructor(readonly answerRepository: AnswerRepository) {}

  async run(answer: Answer) {
    await this.answerRepository.createAnswer(answer);
  }
}
