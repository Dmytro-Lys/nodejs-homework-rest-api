import { contactAddSchema } from '../schemes/contacts-schemes.js';
import { validateBody } from '../decorators/index.js';

const contactAddValidate = validateBody(contactAddSchema)

export default contactAddValidate;