import { Router } from "express";
import { celebrate, Joi, Segments, errors } from "celebrate";
import ListMessagesController from "../controllers/ListMessagesController";
import ShowMessageController from "../controllers/ShowMessageController";
import CreateMessagesController from "../controllers/CreateMessagesController";
import UpdateMessagesController from "../controllers/UpdateMessagesController";
import DeleteMessagesController from "../controllers/DeleteMessagesController";

let messagesRoutes = Router();
let listMessagesController = new ListMessagesController();
let showMessageController = new ShowMessageController();
let createMessagesController = new CreateMessagesController();
let updateMessagesController = new UpdateMessagesController();
let deleteMessagesController = new DeleteMessagesController();

messagesRoutes.get("/", listMessagesController.run);

messagesRoutes.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  showMessageController.run
);

messagesRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      details: Joi.string().required(),
    },
  }),
  createMessagesController.run
);

messagesRoutes.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      details: Joi.string().required(),
    },

    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  updateMessagesController.run
);

messagesRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteMessagesController.run
);

export default messagesRoutes;
