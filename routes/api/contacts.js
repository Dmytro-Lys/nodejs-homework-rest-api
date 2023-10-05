import express from 'express'
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, contactValidateFavorite, contactValidateAll, isValidId } from '../../middlewares/index.js';


const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', isValidId, contactsController.getById);

contactsRouter.post('/', isEmptyBody, contactValidateAll, contactsController.add);

contactsRouter.delete('/:id', isValidId, contactsController.deleteById);

contactsRouter.put('/:id', isValidId, isEmptyBody, contactValidateAll, contactsController.updateById);

contactsRouter.patch('/:contactId/favorite', isValidId, isEmptyBody, contactValidateFavorite, contactsController.updateStatusContact);

export default contactsRouter;
