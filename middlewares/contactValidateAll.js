import { contactSchemaAll } from '../models/Contact.js';
import { validateBody } from '../decorators/index.js';

const contactValidateAll = validateBody(contactSchemaAll)

export default contactValidateAll;