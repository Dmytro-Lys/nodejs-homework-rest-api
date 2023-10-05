import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const messagesRegExpErrors = {
  phone: "Field phone must be in the format (XXX) XXX-XXXX",
  name: "Field name contains invalid characters",
  mail: "Field email must be a valid email"
}

const messagesRequiredErrors = {
   "string.empty": "missing required {#label} field", 
    "any.required": "missing required {#label} field"
}

const messagesNameErrors = {
   "string.pattern.base": messagesRegExpErrors.name
}

const messagesMailErrors = {
   "string.pattern.base": messagesRegExpErrors.mail
}


const messagesPhoneErrors = {
   "string.pattern.base": messagesRegExpErrors.phone
}

const messagesFavoriteErrors = {
   "string.empty": "missing field {#label}", 
   "any.required": "missing field {#label}"
}

const regExpName = /^[a-zA-Zа-яіїєА-ЯІЇЄ]+(([' \-][a-zA-Zа-яіїєА-ЯІЇЄ])?[a-zA-Zа-яіїєА-ЯІЇЄ]*)*$/;

const regExpMail = /^([0-9A-Za-z]{1}([-_\.]?[0-9A-Za-z]+)*)@(([0-9A-Za-z]{1}([-_]?[0-9A-Za-z]+)*\.){1,2}[A-Za-z]{2,})$/

const regExpPhone = /^\(\d{3}\) \d{3}-\d{4}$/




// Mongoose
const contactSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    match: [regExpName, messagesRegExpErrors.name],
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    match: [regExpMail, messagesRegExpErrors.mail],
    required: [true, 'Set email for contact'],
  },
  phone: {
    type: String,
    match: [regExpPhone, messagesRegExpErrors.phone],
    required: [true, 'Set phone for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
   },  { versionKey: false })

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

// Joi
export const contactSchemeAll = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .pattern(new RegExp(regExpName))
        .messages({ ...messagesRequiredErrors, ...messagesNameErrors }),
    email: Joi.string()
        .required()
        .pattern(new RegExp(regExpMail))
        .messages({ ...messagesRequiredErrors, ...messagesMailErrors }),
    phone: Joi.string()
        .required() 
        .pattern(new RegExp(regExpPhone))
        .messages({ ...messagesRequiredErrors, ...messagesPhoneErrors }),
   favorite: Joi.bool()
})

export const contactSchemeFavorite = Joi.object({
   favorite: Joi.bool()
      .required()
      .messages(messagesFavoriteErrors)
})

export default Contact;