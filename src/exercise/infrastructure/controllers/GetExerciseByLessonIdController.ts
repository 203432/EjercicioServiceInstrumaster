import { config } from "dotenv";
import { Request, Response } from "express";

import { GetAnswerByExerciseIdUseCase } from "../../../answers/application/GetAnswerByExerciseIdUseCase";
import { GetExercisesByLessonIdUseCase } from "../../application/GetExercisesByLessonIdUseCase";

config();

export class GetExercisesByLessonIdController {
  constructor(
    readonly getExercisesByLessonIdUseCase: GetExercisesByLessonIdUseCase,
    readonly getAnswerByExerciseIdUseCase: GetAnswerByExerciseIdUseCase
  ) {}

  async run(req: Request, res: Response) {
    try {
      const lessonId = req.params.id;
      const exercises = await this.getExercisesByLessonIdUseCase.run(lessonId);

      const enviroment = process.env.ENVIROMENT;
      let baseUrl = `http://${process.env.IPPROJECT}/public/`;
      if (enviroment == "local") {
        baseUrl = `http://${process.env.IPPROJECT}:${process.env.PORTPROJECT}/public/`;
      }

      const transformedExercises = [];

      for (const exercise of exercises!) {
        const answers = await this.getAnswerByExerciseIdUseCase.run(
          exercise.id
        );

        const transformedAnswers = answers?.map((answer) => {
          let imageName = null;
          if (answer.multimedia) {
            imageName = answer.multimedia.split(/[\\\/]/).pop();
          }
          const imageUrl = baseUrl + imageName;
          const encodedUrl = encodeURI(imageUrl);

          return {
            ...answer,
            multimedia: encodedUrl,
          };
        });

        const exerciseImageUrl = baseUrl + exercise.multimedia;
        const encodedExerciseImageUrl = encodeURI(exerciseImageUrl);

        transformedExercises.push({
          ...exercise,
          multimedia: encodedExerciseImageUrl,
          answers: transformedAnswers || null,
        });
      }

      return res.status(200).json({
        message: "Lista de ejercicios obtenida correctamente",
        data: transformedExercises,
      });
    } catch (error) {
      console.error("Error al obtener la lista de ejercicios:", error);
      return res.status(500).json({
        message: "Error al obtener la lista de ejercicios",
      });
    }
  }
}
