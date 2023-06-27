import { Request, Response } from "express";

import { CreateExerciseUseCase } from "../../application/CreateExerciseUseCase";
import { Exercise } from "../../domain/Exercise";

export class CreateExerciseController {
  constructor(readonly createExerciseUseCase: CreateExerciseUseCase) {}

  async run(req: Request, res: Response) {
    const exercise = req.body;
    const image = req.file!.path;
    console.log(image);
    const exerciseCreated = await this.createExerciseUseCase.run(
      new Exercise(
        "1",
        exercise.id_lesson,
        image,
        exercise.question,
        exercise.answer,
        exercise.stars,
        exercise.exercise_order
      )
    );
    console.log(exerciseCreated);
    return res.status(200).json({
      message: "Nueva ejercicio añadida",
      data: {
        exercise_question: exercise.question,
        exercise_options: exercise.answer,
      },
    });
  }
}
