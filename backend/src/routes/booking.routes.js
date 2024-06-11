module.exports = (express, app) => {
  const controller = require("../controllers/booking.controller.js");
  const router = express.Router();

  // Select a booking by id
  router.get("/:id", controller.one);

  // Select all bookings for a user
  router.get("/user/:userId", controller.all_user);

  // Select all bookings for a movie
  router.get("/movie/:movieId", controller.all_movie);

  // Create a new booking
  router.post("/", controller.create);

  // Update a booking by id
  router.put("/:id", controller.update);

  // Delete a booking by id
  router.delete("/:id", controller.remove);

  // Add routes to server
  app.use("/bookings", router);
};
