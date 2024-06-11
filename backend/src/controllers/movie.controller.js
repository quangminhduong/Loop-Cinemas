const db = require("../database");

// Get a single movie by id
exports.one = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await db.movie.findByPk(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(400).json({ message: `No movie with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all movies
exports.all = async (req, res) => {
  try {
    const movies = await db.movie.findAll();
    if (movies) {
      res.status(200).json(movies);
    } else {
      res.status(400).json({ message: "Failed to retrieve all movies" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new movie
exports.create = async (req, res) => {
  try {
    const movie = await db.movie.create({
      title: req.body.title,
      release_date: req.body.release_date,
      runtime: req.body.runtime,
      director: req.body.director,
      description: req.body.description,
      poster: req.body.poster,
    });

    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res
        .status(400)
        .json({ message: "The movie record could not be created" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a movie in the database
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await db.movie.findByPk(id);

    if (movie) {
      movie.title = req.body.title;
      movie.release_date = req.body.release_date;
      movie.runtime = req.body.runtime;
      movie.director = req.body.director;
      movie.description = req.body.description;
      movie.poster = req.body.poster;

      await movie.save();

      return res.status(200).json(movie);
    } else {
      return res.status(400).json({ message: `No movie with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update the view visits for a movie
exports.update_visits = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await db.movie.findByPk(id);

    if (movie) {
      movie.visits = movie.visits + 1;

      await movie.save();

      return res.status(200).json(movie);
    } else {
      return res.status(400).json({ message: `No movie with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a movie from the database
exports.remove = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await db.movie.findByPk(id);
    if (movie) {
      await movie.destroy();
      return res
        .status(200)
        .json({ message: `Movie with id: ${id} was deleted` });
    } else {
      return res.status(400).json({ message: `No movie with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
