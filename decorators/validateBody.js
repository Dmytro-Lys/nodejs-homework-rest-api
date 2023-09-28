import { HttpError } from "../helpers/index.js"

const getFieldName = msg => {
    if (!msg.includes("required") && !msg.includes("empty") ) return null
    const indexStart = msg.indexOf("\"");
    const indexEnd = msg.lastIndexOf("\"");
    if (indexStart < 0 || indexEnd < 0) return null
    return msg.slice(indexStart + 1, indexEnd - indexStart )
}

const validateBody = scheme => {
    const func = (req, res, next) => {
        const { error } = scheme.validate(req.body);
        if (error) {
            const fieldName = getFieldName(error.message)
            return next(HttpError(400, fieldName ? `missing required ${fieldName} field` : error.message));
        }
        next()
    }
    return func;
}

export default validateBody;