import { Router } from "express";
import { celebrate, Joi, Segments, errors } from "celebrate";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "@core/presentation/http/middlewares/isAuthnticated";

let usersRoutes = Router();
let usersController = new UsersController();

// Para listar os usuários cadastrados, é preciso estar autenticado
usersRoutes.get("/", isAuthenticated, usersController.index);

usersRoutes.post(
  "/",
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),

      // Verifica se os campos Senha e Confirmação de Senha são iguais
      password_confirmation: Joi.string()
        .valid(Joi.ref("password"))
        .when("password", {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  // Chama o controller
  usersController.create
);

export default usersRoutes;
