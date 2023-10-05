import { contactSchemeFavorite } from '../models/Contact.js';
import { validateBody } from '../decorators/index.js';

const contactValidateFavorite = validateBody(contactSchemeFavorite)

export default contactValidateFavorite;