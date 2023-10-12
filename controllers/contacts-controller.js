import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper }  from "../decorators/index.js";

const getAll = async (req, res, next) => {
    const {_id: owner} = req.user;
     const contacts = await Contact.find({owner}, "-createdAt -updatedAt");
    res.status(200).json(contacts)
}

const getById = async (req, res, next) => {
    const {_id: owner} = req.user;
    const { id } = req.params;
    const contact = await Contact.findOne({_id: id, owner}, "-createdAt -updatedAt")
    if (!contact) throw HttpError(404, "Not found")
    res.status(200).json(contact) 
}

const add = async (req, res, next) => {
    const {_id: owner} = req.user;
    const contact = await Contact.create({...req.body, owner})
    res.status(201).json(contact);
}


const deleteById = async (req, res, next) => {
     const { id } = req.params;
    const contact = await Contact.findByIdAndRemove(id)
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json({message: "contact deleted"})
}
 
const updateById = async (req, res, next) => {
    const {_id: owner} = req.user;
    const { id } = req.params;
    const contact = await Contact.findOneAndUpdate({_id: id, owner}, req.body);
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json(contact);
}

const updateStatusContact = async (req, res, next) => {
    const {_id: owner} = req.user;
    const { contactId } = req.params;
    const {favorite} = req.body
    // const contact = await Contact.findByIdAndUpdate(contactId, { favorite });
    const contact = await Contact.findOneAndUpdate({_id: contactId, owner}, { favorite });
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json(contact);
}


export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
    updateStatusContact: ctrlWrapper(updateStatusContact)
}
