import { Exercise } from "../domain/Exercise";
import { ExerciseRepository } from "../domain/ExerciseRepository";

export class CreateExerciseUseCase {
  constructor(readonly exerciseRepository: ExerciseRepository) {}

  async run(exercise: Exercise) {
    await this.exerciseRepository.createExercise(exercise);
  }
}
