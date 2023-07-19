import { config } from "dotenv";
import { Request, Response } from "express";

import { GetAllAnswerUseCase } from "../../application/GetAllAnswerUseCase";
config();

export class GetAllAnswerController {
  constructor(readonly getAllAnswerUseCase: GetAllAnswerUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const answers = await this.getAllAnswerUseCase.run();

      const enviroment = process.env.ENVIROMENT;
      let baseUrl = `http://${process.env.IPPROJECT}/public/`;
      if (enviroment == "local") {
        baseUrl = `http://${process.env.IPPROJECT}:${process.env.PORTPROJECT}/public/`;
      }
      const transformedAnswers = answers?.map((answer) => {
        let imageName = null;
        if (answer.multimedia) {
          imageName = answer.multimedia.split(/[\\\/]/).pop();
        }
        const imageUrl = baseUrl + (imageName || "");
        const encodedUrl = encodeURI(imageUrl);

        return {
          ...answer,
          multimedia: encodedUrl,
        };
      });

      return res.status(200).json({
        message: "Lista de respuestas obtenida correctamente",
        data: transformedAnswers,
      });
    } catch (error) {
      console.error("Error al obtener las respuestas:", error);
      return res.status(500).json({
        message: "Error al obtener la lista de cursos",
      });
    }
  }
}
