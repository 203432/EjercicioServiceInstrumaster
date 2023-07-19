import { Request, Response } from "express";

import { CreateAnswerUseCase } from "../../application/CreateAnswerUseCase";
import { Answer } from "../../domain/Answer";

export class CreateAnswerController {
  constructor(readonly createAnswerUseCase: CreateAnswerUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const answer = req.body;
      let image = null;
      if (req.file) {
        image = req.file.path;
      }
      const answerCreated = await this.createAnswerUseCase.run(
        new Answer(
          "1",
          answer.id_exercise,
          image!,
          answer.answer,
          answer.is_correct
        )
      );
      console.log(answerCreated);
      return res.status(200).json({
        message: "Nueva posible respuesta añadida",
        data: {
          id_exercise: answer.id_exercise,
          answer: answer.answer,
        },
      });
    } catch (error) {
      console.error("Error al obtener las respuestas:", error);
      return res.status(500).json({
        message: "Error al obtener la lista de cursos" + error,
      });
    }
  }
}
