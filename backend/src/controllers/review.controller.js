const db = require("../database");

// Get a single review by id
exports.one = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await db.review.findByPk(id);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(400).json({ message: `No review with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all reviews for a movie
exports.all_movie = async (req, res) => {
  const movieId = req.params.movieId;

  try {
    reviews = await db.review.findAll({ where: { movie_id: movieId } });
    if (reviews) {
      res.status(200).json(reviews);
    } else {
      res.status(400).json({
        message: `Could not find any reviews for movie with id: ${movieId}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all reviews for a user
exports.all_user = async (req, res) => {
  const userId = req.params.userId;

  try {
    reviews = await db.review.findAll({ where: { user_id: userId } });
    if (reviews) {
      res.status(200).json(reviews);
    } else {
      res.status(400).json({
        message: `Could not find any reviews for a user with id: ${userId}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new review
exports.create = async (req, res) => {
  try {
    const review = await db.review.create({
      movie_id: req.body.movieId,
      user_id: req.body.userId,
      username: req.body.username,
      rating: req.body.rating,
      message: req.body.message,
      hidden: false,
    });
    if (review) {
      return res.status(200).json(review);
    } else {
      return res
        .status(400)
        .json({ message: "The review failed to be created" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a review
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await db.review.findByPk(id);

    if (review) {
      review.movie_id = req.body.movieId;
      review.user_id = req.body.userId;
      review.username = req.body.username;
      review.rating = req.body.rating;
      review.message = req.body.message;

      await review.save();

      return res.status(200).json(review);
    } else {
      return res.status(400).json({ message: `No review with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a review
exports.remove = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await db.review.findByPk(id);

    if (review) {
      await review.destroy();
      return res
        .status(200)
        .json({ message: `Review with id: ${id} was deleted` });
    } else {
      return res.status(400).json({ message: `No review with id: ${id}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
