import { nanoid } from "nanoid";
import * as contactService from "../models/contacts.js"
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper }  from "../decorators/index.js";

const checkBody = ({ name = null, email = null, phone = null }) => {
  return `${!name ? 'name': ''}${!email ? ' email': ''}${!phone ? ' phone': ''}`.trim().replaceAll(' ', ', ')
}


const getAll = async(req, res, next) => {
     const contacts = await contactService.listContacts();
    res.status(200).json({
        contacts
    })
}

const getById = async (req, res, next) => {
    const { id } = req.params;
    const contact = await contactService.getContactById(id)
    if (!contact) throw HttpError(404, "Not found")
    res.status(200).json({
      contact 
    }) 
}

const add =  async (req, res, next) => {
    // const messageBody = checkBody(req.body)
    // if (messageBody.length>0) throw HttpError (400, `missing required ${messageBody} field`)
    const contact = await contactService.addContact({ id: nanoid(), ...req.body })
    res.status(201).json({
      contact 
    });
}

const deleteById = async (req, res, next) => {
     const { id } = req.params;
    const contact = await contactService.removeContact(id)
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json({
      message: "contact deleted",
       contact
    })
 }

const updateById = async (req, res, next) => {
    // if (Object.keys(req.body).length === 0) throw HttpError(400, `missing fields`);
    const { id } = req.params;
    const contact = await contactService.updateContact(id, req.body);
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json({
       contact
    });
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById)
}
