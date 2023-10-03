import { contactSchemeFavorite } from '../schemes/contacts-schemes.js';
import { validateBody } from '../decorators/index.js';

const contactValidateFavorite = validateBody(contactSchemeFavorite)

export default contactValidateFavorite;