import { Request, Response } from "express";

import { GetExerciseByIdUseCase } from "../../application/GetExerciseByIdUseCase";
import { Exercise } from "../../domain/Exercise";

export class GradeAnswerController {
  constructor(readonly getExerciseByIdUseCase: GetExerciseByIdUseCase) {}

  async run(req: Request, res: Response) {
    const exerciseId = req.params.id;
    console.log(req.body);
    const body = req.body;
    const userAnswer = body.answer;
    let isCorrect = false;
    console.log(userAnswer);
    const exercise: Exercise | null = await this.getExerciseByIdUseCase.run(
      exerciseId
    );
    if (!exercise) {
      return res.status(400).json({
        message: "No existe este ejercicio",
      });
    }
    if (userAnswer == exercise.answer) {
      isCorrect = true;
    }
    return res.status(200).json({
      message: "Esta es la respuesta correcta",
      data: {
        question: exercise.question,
        answer: exercise.answer,
        isCorrect: isCorrect,
        userAnswer: userAnswer,
      },
    });
  }
}
