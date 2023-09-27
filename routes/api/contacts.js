import { nanoid } from "nanoid";
import express from 'express'
import * as contactService from "../../models/contacts.js"
import HttpError from "../../helpers/HttpError.js";

const contactsRouter = express.Router()

const notFound = () => {
  return res.status(404).json({
    message: "Not found"
  })
}


const checkBody = ({ name = null, email = null, phone = null }) => {
  return `${!name ? 'name': ''}${!email ? ' email': ''}${!phone ? ' phone': ''}`.trim().replaceAll(' ', ', ')
}


contactsRouter.get('/', async (req, res, next) => {
  try {
    const contacts = await contactService.listContacts();
    res.status(200).json({
        contacts
    })
  } catch (error) {
     next(error)
  }
})

contactsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactService.getContactById(id)
    if (!contact) throw HttpError(404, "Not found")
    res.status(200).json({
      contact 
    })
  } catch (error) {
    next(error)
  }
})

contactsRouter.post('/', async (req, res, next) => {
  try {
    const messageBody = checkBody(req.body)
    if (messageBody.length>0) throw HttpError (400, `missing required ${messageBody} field`)
    const contact = await contactService.addContact({ id: nanoid(), ...req.body })
    res.status(201).json({
      contact 
    });
  } catch (error) {
    next(error)
  }
})

contactsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactService.removeContact(id)
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json({
      message: "contact deleted",
       contact
    })
  } catch (error) {
    next (error)
  }
})

contactsRouter.put('/:id', async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) throw HttpError(400, `missing fields`);
    const { id } = req.params;
    const contact = await contactService.updateContact(id, req.body);
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json({
       contact
    });
  } catch (error) {
    next(error)
  }
  
})

export default contactsRouter;
