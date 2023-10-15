import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper }  from "../decorators/index.js";

const getAll = async (req, res, next) => {
    const { page = 1, limit = 20, favorite } = req.query;
    if (favorite || favorite === false) req.filter={...req.filter, favorite}
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(req.filter, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email");
    res.status(200).json(contacts)
}

const getById = async (req, res, next) => {
    const contact = await Contact.findOne(req.filter, "-createdAt -updatedAt").populate("owner", "email")
    if (!contact) throw HttpError(404, "Not found")
    res.status(200).json(contact) 
}

const add = async (req, res, next) => {
    const contact = await Contact.create({...req.body, ...req.filter})
    res.status(201).json(contact);
}


const deleteById = async (req, res, next) => {
    const contact = await Contact.findOneAndRemove(req.filter)
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json({message: "contact deleted"})
}
 
const updateById = async (req, res, next) => {
    const contact = await Contact.findOneAndUpdate(req.filter, req.body);
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json(contact);
}

const updateStatusContact = async (req, res, next) => {
    const {favorite} = req.body
    const contact = await Contact.findOneAndUpdate(req.filter, { favorite });
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
