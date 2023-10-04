import Joi from "joi";

const messagesRequiredErrors = {
   "string.empty": "missing required {#label} field", 
    "any.required": "missing required {#label} field"
}

const messagesNameErrors = {
   "string.pattern.base": "Field {#label} contains invalid characters"
}

const messagesPhoneErrors = {
   "string.pattern.base": "Field {#label} must be in the format (XXX) XXX-XXXX"
}

const messagesFavoriteErrors = {
   "any.required": "missing field {#label}"
}

export const contactSchemeAll = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .pattern(new RegExp(/^[a-zA-Zа-яіїєА-ЯІЇЄ]+(([' \-][a-zA-Zа-яіїєА-ЯІЇЄ ])?[a-zA-Zа-яіїєА-ЯІЇЄ]*)*$/))
        .messages({ ...messagesRequiredErrors, ...messagesNameErrors }),
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages(messagesRequiredErrors),
    phone: Joi.string()
        .required() 
        .pattern(new RegExp(/^\(\d{3}\) \d{3}-\d{4}$/))
        .messages({ ...messagesRequiredErrors, ...messagesPhoneErrors }),
   favorite: Joi.bool()
})

export const contactSchemeFavorite = Joi.object({
   favorite: Joi.bool()
         .required()
         .messages(messagesFavoriteErrors)
})