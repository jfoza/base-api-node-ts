import { Router } from "express";
import usersRoutes from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/auth/infra/http/routes/sessions.routes";
import isAuthenticated from "../middlewares/isAuthnticated";
const routes = Router();

routes.use("/auth", sessionsRouter);
routes.use("/users", usersRoutes);

export default routes;
