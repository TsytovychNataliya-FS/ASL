const { Star } = require("../src/models"); // Import the Star model

// Show all resources
const index = async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.status(200).json(stars);
  } catch (error) {
    console.error(error.stack); // Logs stack trace for debugging
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};

// Show a single resource
const show = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (!star) {
      return res.status(404).json({ message: "Star not found" });
    }
    res.status(200).json(star); // Respond with the found star
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const { name, size, galaxyId } = req.body; // Check for required fields
    if (!name || !size || !galaxyId) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, size, galaxyId" });
    }
    const star = await Star.create(req.body);
    res.status(201).json(star);
  } catch (error) {
    console.error(error.stack); // Log the full error stack
    res.status(400).json({ error: error.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (!star) {
      return res.status(404).json({ message: "Star not found" });
    }
    await star.update(req.body); // Update the star with new data from the request body
    res.status(200).json(star); // Respond with the updated star
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (!star) {
      return res.status(404).json({ message: "Star not found" });
    }
    await star.destroy(); // Delete the star from the database
    res.status(204).json(); // Respond with a 204 (No Content) status code
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { index, show, create, update, remove };
