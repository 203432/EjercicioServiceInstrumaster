import { config } from "dotenv";
import { Request, Response } from "express";

import { GetExerciseByIdUseCase } from "../../../exercise/application/GetExerciseByIdUseCase";
import { Exercise } from "../../../exercise/domain/Exercise";
import { GetAnswerByExerciseIdUseCase } from "../../application/GetAnswerByExerciseIdUseCase";

config();

export class GetFourAnswersController {
  constructor(
    readonly getAnswerByExerciseIdUseCase: GetAnswerByExerciseIdUseCase,
    readonly getExerciseByIdUseCase: GetExerciseByIdUseCase
  ) {}

  async run(req: Request, res: Response) {
    try {
      const exerciseId = req.params.id;
      const answers = await this.getAnswerByExerciseIdUseCase.run(exerciseId);

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
        const imageUrl = baseUrl + imageName;
        const encodedUrl = encodeURI(imageUrl);

        return {
          ...answer,
          multimedia: encodedUrl,
        };
      });
      const selectedAnswers = [];
      let correctAnswer = null;

      // Buscar y seleccionar el elemento correcto
      for (let i = 0; i < transformedAnswers!.length; i++) {
        const answer = transformedAnswers![i];
        if (answer.is_correct === 1) {
          correctAnswer = answer;
          transformedAnswers!.splice(i, 1);
          break;
        }
      }

      // Verificar si no se encontró el elemento correcto
      if (correctAnswer === null) {
        const randomIndex = Math.floor(
          Math.random() * transformedAnswers!.length
        );
        correctAnswer = transformedAnswers![randomIndex];
        transformedAnswers!.splice(randomIndex, 1);
      }

      // Agregar el elemento correcto al principio de los seleccionados
      selectedAnswers.unshift(correctAnswer);

      // Seleccionar los elementos restantes aleatoriamente
      if (transformedAnswers && transformedAnswers.length > 0) {
        const numToSelect = Math.min(3, transformedAnswers.length); // Seleccionar un máximo de 3 respuestas aleatorias
        for (let i = 0; i < numToSelect; i++) {
          const randomIndex = Math.floor(
            Math.random() * transformedAnswers.length
          );
          const selectedAnswer = transformedAnswers[randomIndex];
          selectedAnswers.push(selectedAnswer);

          transformedAnswers.splice(randomIndex, 1);
        }
      }

      const exercise: Exercise | null = await this.getExerciseByIdUseCase.run(
        exerciseId
      );
      if (!exercise) {
        return res.status(400).json({
          message: "No existe este ejercicio",
        });
      }

      console.log(exercise?.question);
      const imageFromDB = exercise.multimedia;
      console.log(imageFromDB);
      const imageName = imageFromDB.split(/[\\\/]/).pop();
      const imageUrl = baseUrl + imageName;
      console.log(imageUrl);
      const encodedUrl = encodeURI(imageUrl);
      console.log(encodedUrl);
      return res.status(200).json({
        message: "Cuatro respuestas obtenidas",
        data: {
          id: exercise.id,
          id_lesson: exercise.id_lesson,
          question: exercise.question,
          exercise_order: exercise.exercise_order,
          stars: exercise.stars,
          multimedia: encodedUrl,
          answer: selectedAnswers,
        },
      });
    } catch (error) {
      console.error("Error al obtener la lista de cursos:", error);
      return res.status(500).json({
        message: "Error al obtener la lista de cursos",
      });
    }
  }
}
