import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper }  from "../decorators/index.js";

const getAll = async(req, res, next) => {
     const contacts = await Contact.find();
    res.status(200).json(contacts)
}

const getById = async (req, res, next) => {
    const { id } = req.params;
    const contact = await Contact.findOne({_id: id})
    if (!contact) throw HttpError(404, "Not found")
    res.status(200).json(contact) 
}

const add = async (req, res, next) => {
    console.log(req.body)
    const contact = await Contact.create(req.body )
    res.status(201).json(contact);
}


const deleteById = async (req, res, next) => {
     const { id } = req.params;
    const contact = await Contact.findByIdAndRemove({ _id: id })
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json({message: "contact deleted"})
}
 
const updateById = async (req, res, next) => {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json(contact);
}

const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const contact = await Contact.findByIdAndUpdate({ _id: contactId },{ favorite }, { new: true });
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
