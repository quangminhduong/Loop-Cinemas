module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select user by id
  router.get("/:id", controller.one);

  // Attempt login of user
  router.post("/login", controller.login);

  // Create a new user
  router.post("/", controller.create);

  // Update a specified user
  router.put("/:id", controller.update);

  // Delete a specified user
  router.delete("/:id", controller.remove);

  // Add routes to server
  app.use("/users", router);
};
