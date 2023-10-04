import express from 'express'
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, contactValidateFavorite, contactValidateAll } from '../../middlewares/index.js';


const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', contactsController.getById);

contactsRouter.post('/', isEmptyBody, contactValidateAll, contactsController.add);

contactsRouter.delete('/:id', contactsController.deleteById);

contactsRouter.put('/:id', isEmptyBody, contactValidateAll, contactsController.updateById);

contactsRouter.patch('/:contactId/favorite',  contactValidateFavorite, contactsController.updateStatusContact);

export default contactsRouter;
