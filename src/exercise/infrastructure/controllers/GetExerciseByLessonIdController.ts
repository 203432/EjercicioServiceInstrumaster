import { config } from "dotenv";
import { Request, Response } from "express";

import { GetExercisesByLessonIdUseCase } from "../../application/GetExercisesByLessonIdUseCase";

config();

export class GetExercisesByLessonIdController {
  constructor(
    readonly getExercisesByLessonIdUseCase: GetExercisesByLessonIdUseCase
  ) {}

  async run(req: Request, res: Response) {
    try {
      const lessonId = req.params.id;
      const exercises = await this.getExercisesByLessonIdUseCase.run(lessonId);

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
