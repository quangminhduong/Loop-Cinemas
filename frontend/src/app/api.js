import axios from "axios";
// URL to backend
const api = axios.create({
  baseURL: "http://localhost:4000",
});
export default api;

// -------------------------------------------------------------------------
// USER API CALLS
// -------------------------------------------------------------------------

// Create a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login a user
export const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a single user by their ID
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a single user by their ID
export const updateUserById = async (userId, requestData) => {
  try {
    const response = await api.put(`/users/${userId}`, requestData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete a user by their ID
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// -------------------------------------------------------------------------
// MOVIE API CALLS
// -------------------------------------------------------------------------

// Get all of the movies in the database
export const getMovies = async () => {
  try {
    const response = await api.get("/movies");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a single movie by its ID
export const getMovieById = async (movieId) => {
  try {
    const response = await api.get(`/movies/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new visist to the movies visist record (for admin analytics)
export const updateMovieVisits = async (movieId) => {
  try {
    const response = await api.put(`/movies/visits/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// -------------------------------------------------------------------------
// REVIEW API CALLS
// -------------------------------------------------------------------------

// Get all of the reviews for a given movie
export const getMovieReviews = async (movieId) => {
  try {
    const response = await api.get(`/reviews/movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all of the reviews from a given user
export const getUserReviews = async (userId) => {
  try {
    const response = await api.get(`/reviews/user/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete a review by its ID
export const deleteReview = async (reviewId) => {
  try {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Create a new review
export const createReview = async (reviewData) => {
  try {
    const response = await api.post("/reviews", reviewData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit a review by its ID
export const editReview = async (reviewId, editedReview) => {
  try {
    const response = await api.put(`/reviews/${reviewId}`, editedReview);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// -------------------------------------------------------------------------
// SESSION API CALLS
// -------------------------------------------------------------------------

// Get all of the sessions for a single movie
export const getMovieSessions = async (movieId) => {
  try {
    const response = await api.get(`/sessions/movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// -------------------------------------------------------------------------
// BOOKINGS API CALLS
// -------------------------------------------------------------------------

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post("/bookings/", bookingData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get all of the bookings for a single user
export const getUserBookings = async (userId) => {
  try {
    const response = await api.get(`/bookings/user/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
