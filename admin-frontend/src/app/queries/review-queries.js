import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4000/reviews";

// Get all reviews
const getAllReviews = async () => {
  const query = gql`
    {
      all_reviews {
        id
        movie_id
        user_id
        username
        rating
        message
        hidden
        createdAt
        updatedAt
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);
  return data.all_reviews;
};

// Get all the reviews for a movie
const getAllMovieReviews = async (id) => {
  const query = gql`
    query ($id: Int) {
      movie_reviews(id: $id) {
        id
        rating
      }
    }
  `;
  const variables = { id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.movie_reviews;
};

// Hide/Unhide a review
const hideUnhideReview = async (id, hidden) => {
  const query = gql`
    mutation ($id: Int, $hidden: Boolean) {
      hide_unhide_review(id: $id, hidden: $hidden) {
        id
        hidden
      }
    }
  `;
  const variables = { id, hidden };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.hide_unhide_review;
};

// Count reviews for a specific movie
const countReviewsByMovieId = async (movie_id) => {
  const query = gql`
    query ($movie_id: Int) {
      count_reviews_by_movie_id(movie_id: $movie_id)
    }
  `;
  const variables = { movie_id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.count_reviews_by_movie_id;
};

// Get the average rating per movie
const getAverageRatingForMovie = async (movie_id) => {
  const query = gql`
    query ($movie_id: Int) {
      average_ratings(movie_id: $movie_id)
    }
  `;
  const variables = { movie_id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.average_ratings;
};

export { getAllReviews, getAllMovieReviews, hideUnhideReview, countReviewsByMovieId, getAverageRatingForMovie };
