import express from "express";

import upload from "../../libs/multer";
import {
  createExerciseController,
  getAllExercisesController,
  getExerciseByIdController,
  getExercisesByLessonIdController,
  // gradeAnswerController,
} from "./dependencies";

export const exerciseRouter = express.Router();

//Crear ejercicios

exerciseRouter.post(
  "/",
  upload.single("multimedia"),
  createExerciseController.run.bind(createExerciseController)
);

//traer todos los ejercicios
exerciseRouter.get(
  "/",
  getAllExercisesController.run.bind(getAllExercisesController)
);

//Traer todas los ejercicios de una leccion
exerciseRouter.get(
  "/lessonId/:id",
  getExercisesByLessonIdController.run.bind(getExercisesByLessonIdController)
);

exerciseRouter.get(
  "/id/:id",
  getExerciseByIdController.run.bind(getExerciseByIdController)
);

// exerciseRouter.post(
//   "/answer/:id",
//   gradeAnswerController.run.bind(gradeAnswerController)
// );
