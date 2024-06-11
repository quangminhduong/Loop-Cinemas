const { buildSchema } = require("graphql");
const db = require("../database");

const reviews = {};

reviews.schema = buildSchema(`
  type Review {
    id: Int
    movie_id: Int
    user_id: Int
    username: String
    rating: Int
    message: String
    hidden: Boolean
    createdAt: String
    updatedAt: String
  }
  type Query {
    all_reviews : [Review]
    user_reviews(id: Int) : [Review]
    movie_reviews(id: Int) : [Review]
    count_reviews_by_movie_id(movie_id: Int): Int
    average_ratings(movie_id: Int): Float
  }
  type Mutation {
    hide_unhide_review(id: Int, hidden: Boolean) : Review
    delete_review(id: Int) : Boolean
  }
`);

reviews.root = {
  // Queries
  all_reviews: async () => {
    return await db.review.findAll();
  },
  user_reviews: async (args) => {
    return await db.review.findAll({ where: { user_id: args.id } });
  },
  movie_reviews: async (args) => {
    return await db.review.findAll({ where: { movie_id: args.id } });
  },

  count_reviews_by_movie_id: async (args) => {
    return await db.review.count({ where: { movie_id: args.movie_id } });;
  },

  average_ratings: async (args) => {
    const movieId = args.movie_id;
  
    const movieReviews = await db.review.findAll({ where: { movie_id: movieId } });
  
    if (movieReviews.length === 0) {
      return 0; // Return 0 if there are no reviews for the movie
    }
  
    const totalRatings = movieReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / movieReviews.length;
  
    const roundedAverageRating = parseFloat(averageRating.toFixed(2));

    return roundedAverageRating;
  },
  

  // Mutations
  hide_unhide_review: async (args) => {
    const review = await db.review.findByPk(args.id);
    review.hidden = args.hidden;
    await review.save();
    return review;
  },
  delete_review: async (args) => {
    const review = await db.review.findByPk(args.id);
    if (review === null) return false;
    await review.destroy();
    return true;
  },
};

module.exports = reviews;
