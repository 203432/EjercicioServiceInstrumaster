import { CreateExerciseUseCase } from "../application/CreateExerciseUseCase";
import { GetAllExercisesUseCase } from "../application/GetAllExercisesUseCase";
import { GetExerciseByIdUseCase } from "../application/GetExerciseByIdUseCase";
import { GetExercisesByLessonIdUseCase } from "../application/GetExercisesByLessonIdUseCase";
import { GradeAnswerUseCase } from "../application/GradeAnswerUseCase";
import { CreateExerciseController } from "./controllers/CreateExerciseController";
import { GetAllExercisesController } from "./controllers/GetAllExercisesController";
import { GetExerciseByIdController } from "./controllers/GetExerciseByIdController";
import { GetExercisesByLessonIdController } from "./controllers/GetExerciseByLessonIdController";
import { GradeAnswerController } from "./controllers/GradeAnswerController";
import { PostgresExerciseRepository } from "./PostgresExerciseRepository";

//Exportar el repositorio
export const postgresExerciseRepository = new PostgresExerciseRepository();

//Create exercise
export const createExerciseUseCase = new CreateExerciseUseCase(
  postgresExerciseRepository
);
export const createExerciseController = new CreateExerciseController(
  createExerciseUseCase
);

//Get all exercises
export const getAllExercisesUseCase = new GetAllExercisesUseCase(
  postgresExerciseRepository
);
export const getAllExercisesController = new GetAllExercisesController(
  getAllExercisesUseCase
);

//Get Exercises by lessonId
export const getExercisesByLessonIdUseCase = new GetExercisesByLessonIdUseCase(
  postgresExerciseRepository
);
export const getExercisesByLessonIdController =
  new GetExercisesByLessonIdController(getExercisesByLessonIdUseCase);

//Get exercise by id
export const getExerciseByIdUseCase = new GetExerciseByIdUseCase(
  postgresExerciseRepository
);
export const getExerciseByIdController = new GetExerciseByIdController(
  getExerciseByIdUseCase
);

//Grade Answers
export const gradeAnswerUseCase = new GradeAnswerUseCase(
  postgresExerciseRepository
);
export const gradeAnswerController = new GradeAnswerController(
  getExerciseByIdUseCase
);
