import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";


const userShemaValidation = {
   password: {
      regExp: /(?=.*[0-9])(?=.*[!@#$%^&*()-_=+,<.>/?;:'"\[\]{}|])(?=.*[a-z])(?=.*[A-Z])[!@#$%^&*()-_=+,<.>/?;:'"\[\]{}|]{8,}/g,
      errorMessage: "The password must contain at least one lowercase letter, one uppercase letter, one number and one special character",
      requiredErrorMessage: 'Set password for user'
   },
   email: {
      regExp: /^([0-9A-Za-z]{1}([-_\.]?[0-9A-Za-z]+)*)@(([0-9A-Za-z]{1}([-_]?[0-9A-Za-z]+)*\.){1,2}[A-Za-z]{2,})$/,
      errorMessage: "Field email must be a valid email",
      requiredErrorMessage: 'Email is required'
   }
}

const addFieldMongoose = fieldName => {
   const {regExp, errorMessage, requiredErrorMessage} = userShemaValidation[fieldName]
   return {
      type: String,
      match: [regExp, errorMessage],
      required: [true, requiredErrorMessage],
   }
}

const messagesErrorsJoi = message => {
   return {
      "string.empty": "missing required {#label} field", 
      "any.required": "missing required {#label} field",
      "string.pattern.base": message
   }
}

function addFieldJoi( fieldName) {
   const {regExp, errorMessage} = contactShemaValidation[fieldName]
   return this.string().required()
      .pattern(new RegExp(regExp))
        .messages(messagesErrorsJoi(errorMessage))
}

const subscriptionList =  ["starter", "pro", "business"]

// Mongoose
const userSchemaDB = new Schema({
   password: { ...addFieldMongoose("password"), minlength: 8 },
    email: { ...addFieldMongoose("email"), unique: true },
   subscription: {
    type: String,
    enum: subscriptionList,
    default: "starter"
  },
    token: String
   },  { versionKey: false, timestamps: true })

userSchemaDB.post("save", handleSaveError);

userSchemaDB.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchemaDB.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchemaDB);


// Joi
export const userSchemaSignup = Joi.object({
   password: addFieldJoi.call(Joi, "password")
         .min(8),
    email: addFieldJoi.call(Joi, "email"),
    subscription: Joi.string().valid(...subscriptionList)
})

export const userSchemaSignin = Joi.object({
   password: addFieldJoi.call(Joi, "password")
         .min(8),
    email: addFieldJoi.call(Joi, "email")
})

export default User;