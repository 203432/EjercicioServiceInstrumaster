import express from "express";

import upload from "../../libs/multer";
import {
  createAnswerController,
  getAllAnswerController,
  getAnswerByIdController,
  getAnswersByExerciseIdController,
  getFourAnswersController,
} from "./dependencies";

export const answerRouter = express.Router();

//Crear pregunta
answerRouter.post(
  "/",
  upload.single("multimedia"),
  createAnswerController.run.bind(createAnswerController)
);

//traer todas las respuestas
answerRouter.get("/", getAllAnswerController.run.bind(getAllAnswerController));

//Traer todas las respuestas de una leccion
answerRouter.get(
  "/exerciseId/:id",
  getAnswersByExerciseIdController.run.bind(getAnswersByExerciseIdController)
);

answerRouter.get(
  "/id/:id",
  getAnswerByIdController.run.bind(getAnswerByIdController)
);

//Four answer
answerRouter.get(
  "/four/:id",
  getFourAnswersController.run.bind(getFourAnswersController)
);
