import { Router } from "express";
import { celebrate, Joi, Segments, errors } from "celebrate";
import SessionsController from "../controllers/SessionsController";

let sessionsRouter = Router();
let sessionsController = new SessionsController();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create
);

export default sessionsRouter;
