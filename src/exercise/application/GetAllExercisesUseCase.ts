import { ExerciseRepository } from "../domain/ExerciseRepository";

export class GetAllExercisesUseCase {
  constructor(readonly exerciseRepository: ExerciseRepository) {}

  async run() {
    const exercises = await this.exerciseRepository.getAllExercises();
    return exercises;
  }
}
