const { Galaxy } = require("../src/models"); // Import the Galaxy model

// Show all resources
const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    res.status(200).json(galaxies); // Respond with all galaxies in the database
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Show a single resource
const show = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (!galaxy) {
      return res.status(404).json({ message: "Galaxy not found" });
    }
    res.status(200).json(galaxy); // Respond with the found galaxy
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new resource
const create = (req, res) => {
  const { name, size, description } = req.body;

  // Create a new galaxy with the data from the request body
  Galaxy.create({ name, size, description })
    .then((newGalaxy) => {
      res.status(201).json(newGalaxy); // Return the created galaxy
    })
    .catch((error) => {
      res.status(400).json({ error: error.message }); // Handle any errors
    });
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (!galaxy) {
      return res.status(404).json({ message: "Galaxy not found" });
    }
    await galaxy.update(req.body); // Update the galaxy with new data from the request body
    res.status(200).json(galaxy); // Respond with the updated galaxy
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (!galaxy) {
      return res.status(404).json({ message: "Galaxy not found" });
    }
    await galaxy.destroy(); // Delete the galaxy from the database
    res.status(204).json(); // Respond with a 204 (No Content) status code
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { index, show, create, update, remove };
