import { GetExerciseByIdUseCase } from "../../exercise/application/GetExerciseByIdUseCase";
import { PostgresExerciseRepository } from "../../exercise/infrastructure/PostgresExerciseRepository";
import { CreateAnswerUseCase } from "../application/CreateAnswerUseCase";
import { GetAllAnswerUseCase } from "../application/GetAllAnswerUseCase";
import { GetAnswerByExerciseIdUseCase } from "../application/GetAnswerByExerciseIdUseCase";
import { GetAnswerByIdUseCase } from "../application/GetAnswerByIdUseCase";
import { GetFourAnswersUseCase } from "../application/GetFourAnswersUseCase";
import { CreateAnswerController } from "./controllers/CreateAnswerController";
import { GetAllAnswerController } from "./controllers/GetAllAnswerController";
import { GetAnswerByExerciseIdController } from "./controllers/GetAnswerByExerciseIdController";
import { GetAnswerByIdController } from "./controllers/GetAnswerByIdController";
import { GetFourAnswersController } from "./controllers/GetFourAnswerController";
import { PostgresAnswerRepository } from "./PostgresAnswerRepository";

//Exportar repositorio
export const postgresAnswerRepository = new PostgresAnswerRepository();
export const postgresExerciseRepository = new PostgresExerciseRepository();

//Create Answer
export const createAnswerUseCase = new CreateAnswerUseCase(
  postgresAnswerRepository
);
export const createAnswerController = new CreateAnswerController(
  createAnswerUseCase
);

//Get All answers
export const getAllAnswerUseCase = new GetAllAnswerUseCase(
  postgresAnswerRepository
);
export const getAllAnswerController = new GetAllAnswerController(
  getAllAnswerUseCase
);

//Get By Exercise Id
export const getAnswersByExerciseIdUseCase = new GetAnswerByExerciseIdUseCase(
  postgresAnswerRepository
);
export const getAnswersByExerciseIdController =
  new GetAnswerByExerciseIdController(getAnswersByExerciseIdUseCase);

//Get By Id
export const getAnswerByIdUseCase = new GetAnswerByIdUseCase(
  postgresAnswerRepository
);
export const getAnswerByIdController = new GetAnswerByIdController(
  getAnswerByIdUseCase
);

//Get four random answers
export const getExerciseByIdUseCase = new GetExerciseByIdUseCase(
  postgresExerciseRepository
);

export const getFourAnswersUseCase = new GetFourAnswersUseCase(
  postgresAnswerRepository
);
export const getFourAnswersController = new GetFourAnswersController(
  getFourAnswersUseCase,
  getExerciseByIdUseCase
);
