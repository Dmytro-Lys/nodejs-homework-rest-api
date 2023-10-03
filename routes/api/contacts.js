import express from 'express'
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, contactValidateRequired, contactValidateValues, contactValidateFavorite } from '../../middlewares/index.js';


const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', contactsController.getById);

contactsRouter.post('/', isEmptyBody, contactValidateRequired, contactValidateValues, contactsController.add);

contactsRouter.delete('/:id', contactsController.deleteById);

contactsRouter.put('/:id', isEmptyBody, contactValidateRequired, contactValidateValues, contactsController.updateById);

contactsRouter.patch('/:contactId/favorite', isEmptyBody, contactValidateFavorite, contactsController.updateStatusContact);

export default contactsRouter;
