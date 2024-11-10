const { v4: uuidv4 } = require("uuid"); // Import UUID for unique IDs
const {
  filterContacts,
  sortContacts,
  Pager,
  ContactModel,
} = require("/node_modules/@jworkman-fs/asl/src/Data/contacts");

let contacts = ContactModel;

// Define emailRegex globally for reusability
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Handler for GET request - Get all contacts with filtering, sorting, and pagination
const getContacts = (req, res) => {
  try {
    const filtered = filterContacts(
      contacts,
      req.get("X-Filter-By"),
      req.get("X-Filter-Value")
    );

    const sorted = sortContacts(filtered, req.query.sort, req.query.direction);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json({ message: "Page and limit must be greater than 0" });
    }

    const pager = new Pager(sorted, page, limit);

    const pageResults = pager.getPage();
    if (pageResults.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    res.json(pageResults);
  } catch (error) {
    console.error("Error getting contacts", error); // Log the error for debugging
    res.status(500).json({ message: "Error getting contacts", error });
  }
};

// Handler for POST request - Create new contact
const createContact = (req, res) => {
  try {
    const newContact = req.body;

    if (!newContact.firstName || !newContact.lastName || !newContact.email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!emailRegex.test(newContact.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingContact = contacts.find((c) => c.email === newContact.email);
    if (existingContact) {
      return res.status(400).json({ message: "Email already exists" });
    }

    newContact.id = uuidv4();
    contacts.push(newContact);

    const contactUrl = `/contacts/${newContact.id}`;

    res.status(303).set("Location", contactUrl).json(newContact);
  } catch (error) {
    console.error("Error creating contact", error); // Log the error for debugging
    res.status(500).json({ message: "Error creating contact", error });
  }
};

// Handler for PUT request - Update contact by ID
const updateContact = (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const contact = contacts.find((c) => c.id === id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (updatedData.email && !emailRegex.test(updatedData.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    Object.assign(contact, updatedData);

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error updating contact", error); // Log the error for debugging
    res.status(500).json({ message: "Error updating contact", error });
  }
};

// Handler for DELETE request - Delete contact by ID
const deleteContact = (req, res) => {
  try {
    const { id } = req.params;

    const contactIndex = contacts.findIndex((c) => c.id === id);
    if (contactIndex === -1) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contacts.splice(contactIndex, 1);

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting contact", error); // Log the error for debugging
    res.status(500).json({ message: "Error deleting contact", error });
  }
};

// Handler for GET request - Get contact by ID
const getContactById = (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  res.json(contact);
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactById,
};
