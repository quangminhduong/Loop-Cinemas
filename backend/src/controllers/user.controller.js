const db = require("../database");

// Get a single user by id
exports.one = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await db.user.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: `No user with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new user in the database
exports.create = async (req, res) => {
  // First check to see if there is a user with provided username already
  try {
    const existingUserUsername = await db.user.findOne({
      where: { username: req.body.username },
    });
    // Return bad response if the username already exists
    if (existingUserUsername !== null) {
      return res.status(400).json({
        message: `A user with the username: ${req.body.username} already exists`,
      });
    }
    const existingUserEmail = await db.user.findOne({
      where: { email: req.body.email },
    });
    // Return bad response if the email already exists
    if (existingUserEmail !== null) {
      return res.status(400).json({
        message: `A user with the email: ${req.body.email} already exists`,
      });
    }

    const user = await db.user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      type: "user",
      enabled: true,
    });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "Failed to create a new user" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a user in the database
exports.update = async (req, res) => {
  const id = req.params.id;

  // First check to see if there is already a user with the passed username or email
  try {
    const userWithUsername = await db.user.findOne({
      where: { username: req.body.username },
    });
    if (userWithUsername !== null && userWithUsername.id !== Number(id)) {
      return res
        .status(400)
        .json({ message: "A user with this username already exists" });
    }
    const userWithEmail = await db.user.findOne({
      where: { email: req.body.email },
    });
    if (userWithEmail !== null && userWithEmail.id !== Number(id)) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }

  // If the username and email are valid, update user record
  try {
    const user = await db.user.findByPk(id);

    if (user) {
      user.username = req.body.username;
      user.email = req.body.email;
      // Only update the password if it's not empty
      if (req.body.password) {
        user.password = req.body.password;
      }

      await user.save();

      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: `No user with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a user from the database
exports.remove = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await db.user.findByPk(id);
    if (user) {
      await user.destroy();
      return res
        .status(200)
        .json({ message: `User with id ${id} was deleted` });
    } else {
      return res.status(400).json({ message: `No user with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Find a matching user in database for login
exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await db.user.findOne({
      where: { email: email, password: password },
    });
    if (user) {
      return res.status(200).json({ success: true, user });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "User details incorrect" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
