import { ExerciseRepository } from "../domain/ExerciseRepository";

export class GetExercisesByLessonIdUseCase {
  constructor(readonly exerciseRepository: ExerciseRepository) {}

  async run(lessonId: string) {
    const exercises = await this.exerciseRepository.getExercisesByLessonId(
      lessonId
    );
    return exercises;
  }
}
