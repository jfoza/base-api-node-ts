import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListMessagesController from '../controllers/ListMessagesController';
import ShowMessageController from '../controllers/ShowMessageController';
import CreateMessagesController from '../controllers/CreateMessagesController';
import UpdateMessagesController from '../controllers/UpdateMessagesController';
import DeleteMessagesController from '../controllers/DeleteMessagesController';

const messagesRoutes = Router();
const listMessagesController = new ListMessagesController();
const showMessageController = new ShowMessageController();
const createMessagesController = new CreateMessagesController();
const updateMessagesController = new UpdateMessagesController();
const deleteMessagesController = new DeleteMessagesController();

messagesRoutes.get('/', listMessagesController.handle);

messagesRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  showMessageController.handle,
);

messagesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      description: Joi.string().required(),
      details: Joi.string().required(),
    },
  }),
  createMessagesController.handle,
);

messagesRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      details: Joi.string().required(),
    },

    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  updateMessagesController.handle,
);

messagesRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteMessagesController.handle,
);

export default messagesRoutes;
