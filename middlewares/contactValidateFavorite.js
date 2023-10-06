import { contactSchemaFavorite } from '../models/Contact.js';
import { validateBody } from '../decorators/index.js';

const contactValidateFavorite = validateBody(contactSchemaFavorite)

export default contactValidateFavorite;