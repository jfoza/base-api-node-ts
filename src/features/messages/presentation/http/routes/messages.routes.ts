import { Router } from "express";
import { celebrate, Joi, Segments, errors } from "celebrate";
import ListMessagesController from "../controllers/ListMessagesController";
import CreateMessagesController from "../controllers/CreateMessagesController";
import UpdateMessagesController from "../controllers/UpdateMessagesController";
import DeleteMessagesController from "../controllers/DeleteMessagesController";
import isAuthenticated from "@core/presentation/http/middlewares/isAuthnticated";

let messagesRoutes = Router();
let listMessagesController = new ListMessagesController();
let createMessagesController = new CreateMessagesController();
let updateMessagesController = new UpdateMessagesController();
let deleteMessagesController = new DeleteMessagesController();

// Para listar os usuários cadastrados, é preciso estar autenticado
messagesRoutes.get("/", isAuthenticated, listMessagesController.run);

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
  createMessagesController.run
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
  updateMessagesController.run
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
  deleteMessagesController.run
);

export default messagesRoutes;
