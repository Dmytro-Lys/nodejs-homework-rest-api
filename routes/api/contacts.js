import express from 'express'
import contactsController from "../../controllers/contacts-controller.js";

const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', contactsController.getById);

contactsRouter.post('/', contactsController.add);

contactsRouter.delete('/:id', contactsController.deleteById);

contactsRouter.put('/:id', contactsController.updateById);

export default contactsRouter;
