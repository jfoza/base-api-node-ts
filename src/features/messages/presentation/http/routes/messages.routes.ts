import { Router } from "express";
import { celebrate, Joi, Segments, errors } from "celebrate";
import MessagesController from "../controllers/MessagesController";
import isAuthenticated from "@core/presentation/http/middlewares/isAuthnticated";

let messagesRoutes = Router();
let messagesController = new MessagesController();

// Para listar os usuários cadastrados, é preciso estar autenticado
messagesRoutes.get("/", isAuthenticated, messagesController.index);

messagesRoutes.post(
  "/",
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      details: Joi.string().required(),
    },
  }),
  // Chama o controller
  messagesController.create
);

messagesRoutes.put(
  "/:id",
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      details: Joi.string().required(),
    },

    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  // Chama o controller
  messagesController.update
);

messagesRoutes.delete(
  "/:id",
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  // Chama o controller
  messagesController.delete
);

export default messagesRoutes;
