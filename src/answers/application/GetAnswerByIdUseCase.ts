import { AnswerRepository } from "../domain/AnswerRepository";

export class GetAnswerByIdUseCase {
  constructor(readonly answerRepository: AnswerRepository) {}

  async run(id: string) {
    const answer = await this.answerRepository.getAnswerById(id);
    return answer;
  }
}
