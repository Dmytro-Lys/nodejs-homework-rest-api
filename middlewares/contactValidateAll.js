import { contactSchemeAll } from '../models/Contact.js';
import { validateBody } from '../decorators/index.js';

const contactValidateAll = validateBody(contactSchemeAll)

export default contactValidateAll;