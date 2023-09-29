import { contactSchemeValues } from '../schemes/contacts-schemes.js';
import { validateBody } from '../decorators/index.js';

const contactValidateValues = validateBody(contactSchemeValues)

export default contactValidateValues;