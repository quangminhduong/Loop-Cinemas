const express = require("express");
const cors = require("cors");
const db = require("./src/database");

const startServer = async () => {
  try {
    // Ensure that the database synchronization is complete before proceeding.
    await db.sync();

    const app = express();
    // Parse requests of content-type - application/json.
    app.use(express.json());
    // Add CORS support.
    app.use(cors());

    // Add routes
    require("./src/routes/user.routes.js")(express, app);
    require("./src/routes/movie.routes.js")(express, app);
    require("./src/routes/review.routes.js")(express, app);
    require("./src/routes/booking.routes.js")(express, app);
    require("./src/routes/session.routes.js")(express, app);

    // Set port, listen for requests.
    const PORT = 4000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });

    return { app, server };
  } catch (error) {
    console.error("Error starting the server:", error);
    throw error;
  }
};

module.exports = startServer;
