import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";

// import { courseRouter } from "./course/infrastructure/CourseRoutes";
import { exerciseRouter } from "./exercise/infrastructure/ExerciseRoute";

const app = express();
config();

const PORT = process.env.PORTPROJECT;

app.use(bodyParser.json());

app.use("/exercise", exerciseRouter);

app.use("/public", express.static("imgs"));
app.get("/", function (req, res) {
  res.send("Esta es la API de la entidad curso de el proeycto instrumaster");
});

app.listen(PORT, () => {
  console.log(
    `[APP] - Starting application on port ${process.env.PORTPROJECT}`
  );
  console.log(`[APP] - Starting application on ip ${process.env.IPPROJECT}`);
});
