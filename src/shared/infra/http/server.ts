import dotenv from "dotenv";
import "reflect-metadata";
import express, { NextFunction, Request, response, Response } from "express";
import "express-async-errors";
import { errors } from "celebrate";
import AppError from "@shared/errors/AppError";
import routes from "./routes";
import cors from "cors";
import "@shared/infra/typeorm";
import "@shared/container";

dotenv.config();

let app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

// Habilita o retorno de erros do celebrate
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    // Função personalizada para tratar os erros
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    // Caso o erro não venha do AppError, é gerado o outro erro a seguir:
    return response.status(500).json({
      status: "error",
      message: "Erro de servidor",
    });
  }
);

app.listen(process.env.PORT || 3333, () => {
  console.log("Server started! 🏆");
});
