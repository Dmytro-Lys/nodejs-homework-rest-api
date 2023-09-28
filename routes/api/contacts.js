import express from 'express'
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, contactAddValidate } from '../../middlewares/index.js';


const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', contactsController.getById);

contactsRouter.post('/', contactAddValidate, contactsController.add);

contactsRouter.delete('/:id', contactsController.deleteById);

contactsRouter.put('/:id', isEmptyBody, contactsController.updateById);

export default contactsRouter;
