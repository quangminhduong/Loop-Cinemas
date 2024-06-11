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
