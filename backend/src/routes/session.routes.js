module.exports = (express, app) => {
  const controller = require("../controllers/session.controller.js");
  const router = express.Router();

  // Select a session by id
  router.get("/:id", controller.one);

  // Select all sessions for a movie
  router.get("/movie/:movieId", controller.all_movie);

  // Create a new session
  router.post("/", controller.create);

  // Update a session by id
  router.put("/:id", controller.update);

  // Delete a session by id
  router.delete("/:id", controller.remove);

  // Add the routes to server
  app.use("/sessions", router);
};
