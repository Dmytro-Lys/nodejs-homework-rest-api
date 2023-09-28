import Joi from "joi";

export const contactAddSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .pattern(new RegExp("^[a-zA-Zа-яіїєА-ЯІЇЄ]+(([' \-][a-zA-Zа-яіїєА-ЯІЇЄ ])?[a-zA-Zа-яіїєА-ЯІЇЄ]*)*$")),
    email: Joi.string()
        .required()
        .pattern(new RegExp("[a-z0-9\._%+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$")),
    phone: Joi.string()
        .required()
        // .pattern(new RegExp("[\+]\d{2} [\(]\d{3}[\)] \d{3} \d{2} \d{2}"))
        
})
