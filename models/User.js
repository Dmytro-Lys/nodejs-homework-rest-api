import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

// !@#$%^&*()\-\_=+,<.>/?;:'\[\]{}|
const userShemaValidation = {
   password: {
      regExp: /(?=.*[0-9])(?=.*[!@#$%^&*()\-\_=+,<.>/?;:'\[\]{}|])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()\-\_=+,<.>/?;:'\[\]{}|]+/,
      errorMessage: "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character",
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
   const {regExp, errorMessage} = userShemaValidation[fieldName]
   return this.string().required()
      .pattern(new RegExp(regExp))
        .messages(messagesErrorsJoi(errorMessage))
}

const messagesSubscriptionErrors = {
   "string.empty": "missing field {#label}", 
   "any.required": "missing field {#label}"
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

export const userSchemaSubscription = Joi.object({
   subscription: Joi.string().required().valid(...subscriptionList).messages(messagesSubscriptionErrors)
})

export default User;