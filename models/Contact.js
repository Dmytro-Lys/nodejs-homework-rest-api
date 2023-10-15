import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

import { addFieldMongoose, addFieldJoi } from "./validation-tools.js";


const contactShemaValidation = {
   name: {
      regExp: /^[a-zA-Zа-яіїєА-ЯІЇЄ]+(([' \-][a-zA-Zа-яіїєА-ЯІЇЄ])?[a-zA-Zа-яіїєА-ЯІЇЄ]*)*$/,
      errorMessage: "Field name contains invalid characters",
      requiredErrorMessage: 'Set {PATH} for contact'
   },
   email: {
      regExp: /^([0-9A-Za-z]{1}([-_\.]?[0-9A-Za-z]+)*)@(([0-9A-Za-z]{1}([-_]?[0-9A-Za-z]+)*\.){1,2}[A-Za-z]{2,})$/,
      errorMessage: "Field email must be a valid email",
      requiredErrorMessage: 'Set {PATH} for contact'
   },
    phone: {
      regExp: /^\(\d{3}\) \d{3}-\d{4}$/,
      errorMessage: "Field phone must be in the format (XXX) XXX-XXXX",
      requiredErrorMessage: 'Set {PATH} for contact'
   }
}

const messagesFavoriteErrors = {
   "string.empty": "missing field {#label}", 
   "any.required": "missing field {#label}"
}


// Mongoose
const contactSchemaDB = new Schema({
   name: { ...addFieldMongoose(contactShemaValidation.name), minlength: 3 },
   email: addFieldMongoose(contactShemaValidation.email),
   phone: addFieldMongoose(contactShemaValidation.phone),
   favorite: {
    type: Boolean,
    default: false,
   },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, { versionKey: false, timestamps: true })
 
contactSchemaDB.post("save", handleSaveError);

contactSchemaDB.pre("findOneAndUpdate", runValidatorsAtUpdate);

contactSchemaDB.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchemaDB);


// Joi
export const contactSchemaAll = Joi.object({
   name: addFieldJoi.call(Joi, contactShemaValidation.name)
         .min(3),
    email: addFieldJoi.call(Joi, contactShemaValidation.email),
    phone: addFieldJoi.call(Joi, contactShemaValidation.phone),
    favorite: Joi.bool()
})

export const contactSchemaFavorite = Joi.object({
   favorite: Joi.bool()
      .required()
      .messages(messagesFavoriteErrors)
})

export default Contact;