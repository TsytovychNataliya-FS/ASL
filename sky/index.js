const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

// Use method-override to support DELETE requests
app.use(methodOverride("_method"));

// Body parser for form data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Only this is necessary for form data

app.set("view engine", "twig");
app.set("views", __dirname + "/src/views");

// In-memory storage for documents (Note: will be lost on server restart)
let documents = [];

// Home route
app.get("/", (req, res) => {
  res.status(200).render("home/home");
});

// Route to render the form
app.get("/add_document", (req, res) => {
  res.render("partials/add_document");
});

// Route to list all documents
app.get("/document_list", (req, res) => {
  res.render("partials/document_list", { documents });
});

// Route to handle form submission (POST)
app.post("/document", (req, res) => {
  const { type } = req.body; // Extract type from form submission
  const connectedEntities = {};

  // Mapping input fields based on the selected entity type
  if (type === "planet") {
    connectedEntities.star = req.body["planet-star"];
  } else if (type === "galaxy") {
    connectedEntities.planets = req.body["galaxy-planet"];
    connectedEntities.stars = req.body["galaxy-star"];
  } else if (type === "star") {
    connectedEntities.planet = req.body["star-planet"];
    connectedEntities.galaxy = req.body["star-galaxy"];
  }

  // Validate the required fields for each entity type
  const missingFields = [];
  for (const [key, value] of Object.entries(connectedEntities)) {
    if (!value) missingFields.push(key);
  }

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing fields: ${missingFields.join(", ")}` });
  }

  // Document structure
  const newDocument = {
    id: documents.length + 1, // Generate a new ID for each document
    type, // Store the entity type
    connectedEntities, // Store connected entities based on type
  };

  // Save to in-memory documents array
  documents.push(newDocument);

  res.status(200).json({ message: "Form submitted successfully", newDocument });
});

// Route to render the edit form
app.get("/documents/:id/edit", (req, res) => {
  const { id } = req.params;
  const document = documents.find((doc) => doc.id === parseInt(id));

  if (document) {
    res.render("partials/edit_document", { document });
  } else {
    res.status(404).send("Document not found");
  }
});

// Route to update a document
app.put("/documents/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, type, size, connected } = req.body;

  const document = documents.find((doc) => doc.id === parseInt(id));

  if (document) {
    document.name = name;
    document.description = description;
    document.type = type;
    document.size = size;
    document.connected = connected;

    res.redirect("/document_list");
  } else {
    res.status(404).send("Document not found");
  }
});

// Route to delete a document
app.delete("/documents/:id", (req, res) => {
  const { id } = req.params;

  // Remove the document by ID
  documents = documents.filter((doc) => doc.id !== parseInt(id));

  res.redirect("/document_list");
});

// Register other routers
const routers = require("./routers/index.js");
app.use("/planets", routers.planet);
app.use("/stars", routers.star);
app.use("/galaxies", routers.galaxy);

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
