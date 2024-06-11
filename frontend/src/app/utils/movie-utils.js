// Return all the movies in descending order by average rating
export const GetMoviesDescendingOrder = (movies) => {
  return movies.sort((a, b) => b.avgRating - a.avgRating);
};

// Return all the movies in ascending order by average rating
export const GetMoviesAscendingOrder = (movies) => {
  return movies.sort((a, b) => a.avgRating - b.avgRating);
};

// Get the average rating for a single movie
export const GetAverageRating = (ratings) => {
  if (!ratings || !Array.isArray(ratings) || ratings.length === 0) {
    // Return a default value or handle the error case as needed
    return 0;
  }

  const total = ratings.reduce((sum, rating) => sum + rating, 0);
  const average = total / ratings.length;

  return Math.round(average * 10) / 10;
};

// Get the poster from a given movie id
export const GetMoviePoster = (movieId, movies) => {
  const movie = movies.find((movie) => movie.id === movieId);
  return movie.poster;
};

// Get the movie title from a given movie id
export const GetMovieTitle = (movieId, movies) => {
  const movie = movies.find((movie) => movie.id === movieId);
  return movie.title;
};

// Remove all reviews from a given user on a movie
export const RemoveUserReviews = (movie, user) => {
  const filteredReivews = movie.reviews.filter(
    (review) => review.username !== user.username
  );
  movie.reviews = filteredReivews;
  return movie;
};
