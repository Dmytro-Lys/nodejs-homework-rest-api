import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve( "models", "contacts.json")

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data)
}

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(({id}) => id === contactId);
  return result || null
}

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const removedItem = contacts.find(({ id }) => id === contactId)
    removedItem && await updateContacts(contacts.filter(({ id }) => id !== contactId))
    return removedItem || null
}

export const addContact = async (body) => {
    const contacts = await listContacts();
    contacts.push(body);
    await updateContacts(contacts);
    return body;
}

export const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const [contact] = contacts.filter(item => item.id === contactId);
    if (!contact) return null
    const updatedContact =  Object.assign (contact, body)
    await updateContacts(contacts);
    return updatedContact
    
}

