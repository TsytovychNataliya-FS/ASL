const { Planet } = require("../src/models"); // Import the Planet model

// Show all resources
const index = async (req, res) => {
  try {
    const planets = await Planet.findAll();
    res.status(200).json(planets); // Respond with all planets in the database
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Show a single resource
const show = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    res.status(200).json(planet); // Respond with the found planet
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const planet = await Planet.create(req.body); // Assuming the request body contains the necessary fields
    res.status(201).json(planet); // Respond with the created planet
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    await planet.update(req.body); // Update the planet with new data from the request body
    res.status(200).json(planet); // Respond with the updated planet
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    await planet.destroy(); // Delete the planet from the database
    res.status(204).json(); // Respond with a 204 (No Content) status code
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { index, show, create, update, remove };
