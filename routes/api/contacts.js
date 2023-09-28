import express from 'express'
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from '../../middlewares/index.js';
import { contactAddSchema } from '../../schemes/contacts-schemes.js';
import { validateBody } from '../../decorators/index.js';

const contactAddValidate = validateBody(contactAddSchema)

const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', contactsController.getById);

contactsRouter.post('/', contactAddValidate, contactsController.add);

contactsRouter.delete('/:id', contactsController.deleteById);

contactsRouter.put('/:id', isEmptyBody, contactsController.updateById);

export default contactsRouter;
