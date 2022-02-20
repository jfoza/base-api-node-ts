import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CreateUsersController from '../controllers/CreateUsersController';
import ListUsersController from '../controllers/ListUsersController';
import isAuthenticated from '@core/presentation/http/middlewares/isAuthnticated';

const usersRoutes = Router();
const listUsersController = new ListUsersController();
const createUsersController = new CreateUsersController();

// Para listar os usuários cadastrados, é preciso estar autenticado
usersRoutes.get('/', isAuthenticated, listUsersController.handle);

usersRoutes.post(
  '/',
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),

      // Verifica se os campos Senha e Confirmação de Senha são iguais
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  // Chama o controller
  createUsersController.handle,
);

export default usersRoutes;
