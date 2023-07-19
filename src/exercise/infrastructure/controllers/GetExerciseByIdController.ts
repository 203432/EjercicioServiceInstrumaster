import { config } from "dotenv";
import { Request, Response } from "express";

import { GetExerciseByIdUseCase } from "../../application/GetExerciseByIdUseCase";
import { Exercise } from "../../domain/Exercise";

config();

export class GetExerciseByIdController {
  constructor(readonly getExerciseByIdUseCase: GetExerciseByIdUseCase) {}

  async run(req: Request, res: Response) {
    const exerciseId = req.params.id;
    const exercise: Exercise | null = await this.getExerciseByIdUseCase.run(
      exerciseId
    );
    if (!exercise) {
      return res.status(400).json({
        message: "No existe este ejercicio",
      });
    }
    const enviroment = process.env.ENVIROMENT;
    let baseUrl = `http://${process.env.IPPROJECT}/public/`;
    if (enviroment == "local") {
      baseUrl = `http://${process.env.IPPROJECT}:${process.env.PORTPROJECT}/public/`;
    }
    console.log(exercise?.id);
    const imageFromDB = exercise.multimedia;
    console.log(imageFromDB);
    const imageName = imageFromDB.split(/[\\\/]/).pop();
    const imageUrl = baseUrl + imageName;
    console.log(imageUrl);
    const encodedUrl = encodeURI(imageUrl);
    return res.status(200).json({
      message: "Leccion encontrada",
      data: {
        id: exercise.id,
        id_lesson: exercise.id_lesson,
        question: exercise.question,
        exercise_order: exercise.exercise_order,
        stars: exercise.stars,
        multimedia: encodedUrl,
      },
    });
  }
}
