module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Select review by id
  router.get("/:id", controller.one);

  // Get reviews by movie id
  router.get("/movie/:movieId", controller.all_movie);

  // Get reviews by user id
  router.get("/user/:userId", controller.all_user);

  // Create a new review
  router.post("/", controller.create);

  // Update a review
  router.put("/:id", controller.update);

  // Delete a review
  router.delete("/:id", controller.remove);

  // Add routes to server
  app.use("/reviews", router);
};
