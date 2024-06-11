module.exports = (express, app) => {
  const controller = require("../controllers/movie.controller.js");
  const router = express.Router();

  // Select movie by id
  router.get("/:id", controller.one);

  // Get all movies
  router.get("/", controller.all);

  // Create a new movie
  router.post("/", controller.create);

  // Update a specified movie
  router.put("/:id", controller.update);

  // Update movie page visits
  router.put("/visits/:id", controller.update_visits);

  // Delete a specified movie
  router.delete("/:id", controller.remove);

  // Add routes to server
  app.use("/movies", router);
};
