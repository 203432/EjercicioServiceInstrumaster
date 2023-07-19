import { config } from "dotenv";
import { Request, Response } from "express";

import { GetAnswerByIdUseCase } from "../../application/GetAnswerByIdUseCase";
import { Answer } from "../../domain/Answer";

config();

export class GetAnswerByIdController {
  constructor(readonly getAnswerByIdUseCase: GetAnswerByIdUseCase) {}

  async run(req: Request, res: Response) {
    const answerId = req.params.id;
    const answer: Answer | null = await this.getAnswerByIdUseCase.run(answerId);
    if (!answer) {
      return res.status(400).json({
        message: "No existe esta respuesta",
      });
    }
    const enviroment = process.env.ENVIROMENT;
    let baseUrl = `http://${process.env.IPPROJECT}/public/`;
    if (enviroment == "local") {
      baseUrl = `http://${process.env.IPPROJECT}:${process.env.PORTPROJECT}/public/`;
    }
    console.log(answer?.id);
    const imageFromDB = answer.multimedia;
    console.log(imageFromDB);
    let imageName = null;
    if (answer.multimedia) {
      imageName = answer.multimedia.split(/[\\\/]/).pop();
    }
    const imageUrl = baseUrl + imageName;
    console.log(imageUrl);
    const encodedUrl = encodeURI(imageUrl);
    return res.status(200).json({
      message: "Leccion encontrada",
      data: {
        id: answer.id,
        id_exercise: answer.id_exercise,
        answer: answer.answer,
        is_correct: answer.is_correct,
        multimedia: encodedUrl,
      },
    });
  }
}
