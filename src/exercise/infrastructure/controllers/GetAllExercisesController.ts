import { config } from "dotenv";
import { Request, Response } from "express";

import { GetAllExercisesUseCase } from "../../application/GetAllExercisesUseCase";

config();

export class GetAllExercisesController {
  constructor(readonly getAllExercisesUseCase: GetAllExercisesUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const exercises = await this.getAllExercisesUseCase.run();

      const baseUrl = `http://${process.env.IPPROJECT}:${process.env.PORTPROJECT}/public/`;

      const transformedExercises = exercises?.map((exercise) => {
        const imageName = exercise.multimedia.split("\\").pop();
        const imageUrl = baseUrl + imageName;
        const encodedUrl = encodeURI(imageUrl);

        return {
          ...exercise,
          multimedia: encodedUrl,
        };
      });

      return res.status(200).json({
        message: "Lista de lecciones obtenida correctamente",
        data: transformedExercises,
      });
    } catch (error) {
      console.error("Error al obtener la lista de cursos:", error);
      return res.status(500).json({
        message: "Error al obtener la lista de cursos",
      });
    }
  }
}
