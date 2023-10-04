import { contactSchemeAll } from '../schemes/contacts-schemes.js';
import { validateBody } from '../decorators/index.js';

const contactValidateAll = validateBody(contactSchemeAll)

export default contactValidateAll;