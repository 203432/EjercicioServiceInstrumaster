import { Exercise } from "../domain/Exercise";
import { ExerciseRepository } from "../domain/ExerciseRepository";

export class AddStarsUseCase {
  constructor(readonly exerciseRepository: ExerciseRepository) {}

  async run(exercise: Exercise) {
    const starsObtain = await this.exerciseRepository.addStars();
    return starsObtain;
  }
}
