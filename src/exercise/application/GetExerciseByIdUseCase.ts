import { ExerciseRepository } from "../domain/ExerciseRepository";

export class GetExerciseByIdUseCase {
  constructor(readonly exerciseRepository: ExerciseRepository) {}

  async run(id: string) {
    const exercise = await this.exerciseRepository.getExerciseById(id);
    return exercise;
  }
}
