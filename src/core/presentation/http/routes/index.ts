import { Router } from "express";
import sessionsRouter from "@features/auth/presentation/http/routes/sessions.routes";
import usersRoutes from "@features/users/presentation/http/routes/users.routes";
import messagesRoutes from "@features/messages/presentation/http/routes/messages.routes";
import isAuthenticated from "../middlewares/isAuthnticated";
const routes = Router();

routes.use("/auth", sessionsRouter);
routes.use("/users", usersRoutes);
routes.use("/messages", isAuthenticated, messagesRoutes);

export default routes;
