const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactById, // Import this function from the controller
} = require("../controllers/contactsController");

// Get all contacts
router.get("/contacts", getContacts); // Fetch all contacts

// Get a single contact by ID
router.get("/contacts/:id", getContactById); // Use the controller function

// Create a new contact
router.post("/contacts", createContact);

// Update an existing contact
router.put("/contacts/:id", updateContact);

// Delete a contact
router.delete("/contacts/:id", deleteContact);

module.exports = router;
