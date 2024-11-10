const express = require("express");
const helmet = require("helmet");
const contactsRoutes = require("./routes/contactsRoutes");
const app = express();

// Security headers with helmet
app.use(helmet());

// Custom Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "http://localhost:8080"], // For images from localhost (adjust for your needs)
    },
  })
);

// Middleware for parsing JSON
app.use(express.json());

// Mount contacts routes
app.use("/v1", contactsRoutes); // Prefixing routes with "/v1"

// Port configuration
const port = process.env.PORT || 8080;

// Server setup
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
