import { Router } from "express";
import sessionsRouter from "@modules/auth/infra/http/routes/sessions.routes";
import usersRoutes from "@modules/users/infra/http/routes/users.routes";
import messagesRoutes from "@modules/messages/infra/http/routes/messages.routes";
import isAuthenticated from "../middlewares/isAuthnticated";
const routes = Router();

routes.use("/auth", sessionsRouter);
routes.use("/users", usersRoutes);
routes.use("/messages", isAuthenticated, messagesRoutes);

export default routes;
