const db = require("../database");

// Get a single session by id
exports.one = async (req, res) => {
  const id = req.params.id;

  try {
    const session = await db.session.findByPk(id);

    if (session) {
      res.status(200).json(session);
    } else {
      res.status(400).json({ message: `No session with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all sessions for a movie
exports.all_movie = async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const sessions = await db.session.findAll({ where: { movie_id: movieId } });

    if (sessions) {
      res.status(200).json(sessions);
    } else {
      res
        .status(400)
        .json({ message: `No sessions with movie_id: ${movieId}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new session
exports.create = async (req, res) => {
  try {
    const session = await db.session.create({
      movie_id: req.body.movie_id,
      time: req.body.time,
      available_seats: 100,
    });

    if (session) {
      return res.status(200).json(session);
    } else {
      return res
        .status(400)
        .json({ message: "The session record could not be created" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a session
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const session = await db.session.findByPk(id);

    if (session) {
      session.movie_id = req.body.movie_id;
      session.time = req.body.time;
      session.available_seats = req.body.available_seats;

      await session.save();

      return res.status(200).json(session);
    } else {
      return res.status(400).json({ message: `No session with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a session
exports.remove = async (req, res) => {
  const id = req.params.id;

  try {
    const session = await db.session.findByPk(id);

    if (session) {
      await session.destroy();
      return res
        .status(200)
        .json({ message: `Session with id: ${id} was deleted` });
    } else {
      return res.status(400).json({ message: `No session with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
