import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { FormatDate, FormatTime24Hours } from "app/utils/format";
import { Dialog, Snackbar, Button } from "@mui/material";

import Header from "app/UI/Header";
import Footer from "app/UI/Footer";
import Card from "app/UI/Card";
import UserReview from "app/UI/UserReview";
import ReviewDialog from "app/UI/ReviewDialog";
import { GetAverageRating } from "app/utils/movie-utils";
import EditReviewDialog from "app/UI/EditReviewDialog";
import {
  getMovieById,
  getMovieSessions,
  getMovieReviews,
  deleteReview,
} from "app/api";
import BookingDialog from "app/UI/BookingDialog";

const Movie = () => {
  const { movieId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [movie, setMovie] = useState(null);
  const [sessionsByDate, setSessionsByDate] = useState({});
  const [average, setAverage] = useState(0);
  const [activeReview, setActiveReview] = useState(undefined);
  const [snackbar, setSnackbar] = useState("");
  const [reviews, setReviews] = useState([]);
  const [sessions, setSessions] = useState([]);

  const userData = JSON.parse(localStorage.getItem("activeUser"));

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(movieId);
        setMovie(response);
        // Fetch sessions for the movie
        const sessionsResponse = await getMovieSessions(movieId);
        const sessionsRes = sessionsResponse;
        setSessions(sessionsRes);

        // Group sessions by date
        const groupedSessions = {};
        sessionsRes.forEach((session) => {
          const date = FormatDate(session.time);
          if (!groupedSessions[date]) {
            groupedSessions[date] = [];
          }
          groupedSessions[date].push(session);
        });

        setSessionsByDate(groupedSessions);
      } catch (error) {
        console.error("Error fetching movie or sessions:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  // Function to fetch reviews for the movie
  const fetchReviewsForMovie = async () => {
    try {
      const reviewsResponse = await getMovieReviews(movieId);
      // Extract the ratings from reviews
      const ratings = reviewsResponse.map((review) => review.rating);
      // Calculate the average rating
      const avgRating = GetAverageRating(ratings);
      setAverage(avgRating);
      setReviews(reviewsResponse);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    // Fetch reviews when the component mounts or when movieId changes
    fetchReviewsForMovie();
  }, [movieId]);

  const handleCloseDialog = async () => {
    setOpenDialog(false);
    try {
      const response = await getMovieById(movieId);
      setMovie(response);
      fetchReviewsForMovie();
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const handleOpenReviewDialog = () => {
    if (userData.enabled) {
      setOpenDialog(true);
      return;
    }
    setSnackbar("You are currently banned from writing reviews");
  };

  const handleDeleteReview = async (review) => {
    // Check to see if the user confirms the action
    const confirm = window.confirm(
      "Are you sure you want to delete this review? This action cannot be undone"
    );
    if (!confirm) return;

    try {
      const response = await deleteReview(review.id);
      if (response.status === 200) {
        setSnackbar("Review deleted!");
        const reviewResponse = await getMovieReviews(movieId);
        setReviews(reviewResponse);
      } else {
        console.error("Failed to delete review:", response.data);
        setSnackbar("Failed to delete the review. Please try again");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      setSnackbar("There was an issue deleting the review. Please try again");
    }
  };

  const handleCloseEditDialog = async () => {
    setActiveReview(undefined);
    try {
      const response = await getMovieById(movieId);
      setMovie(response);
      fetchReviewsForMovie();
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const handleCloseBookingDialog = async (message) => {
    setOpenBookingDialog(false);
    setSnackbar(message);
    // Fetch sessions for the movie
    const sessionsResponse = await getMovieSessions(movieId);
    setSessions(sessionsResponse);
  };

  return (
    <Fragment>
      <Header user={userData} />
      {movie && (
        <div className="w-full h-full flex flex-col pb-12 bg-[#121212] overflow-y-scroll no-scrollbar">
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-[1920px] flex flex-col justify-between p-8 gap-8">
              {/* Main Information Container */}
              <Card className="flex-grow !bg-[#282b2e] !p-4 min-w-[800px]">
                <div className="flex flex-row gap-8">
                  {/* Movie Poster */}
                  <img
                    className="h-[500px] w-[350px]"
                    src={movie.poster}
                    alt="poster"
                  />
                  {/* Movie Information */}
                  <div className="flex flex-col flex-grow w-full text-white justify-between gap-8">
                    <div className="h-fit">
                      <div className="flex flex-row items-center justify-between">
                        <h2 className="font-semibold text-3xl">
                          {movie.title}
                        </h2>
                        {userData && (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenBookingDialog(true)}
                            disabled={sessions.length === 0}
                          >
                            {sessions.length > 0
                              ? "Buy Tickets!"
                              : "Tickets Coming Soon!"}
                          </Button>
                        )}
                      </div>
                      {/* Runtime and Rating */}
                      <div className="flex flex-row gap-4 mt-2">
                        <p className="text-base">Runtime: {movie.runtime}</p>
                        <img
                          className="w-6 h-6"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Australian_Classification_Mature_%28M%29.svg/2048px-Australian_Classification_Mature_%28M%29.svg.png"
                          alt="rating-icon"
                        />
                      </div>
                      {/* Description */}
                      <div className="mt-6 text-lg">{movie.description}</div>
                    </div>
                    <div className="flex flex-row w-full flex-grow justify-between">
                      {/* Director and Cast */}
                      <div className="flex flex-col gap-2">
                        {/* Director information */}
                        <p className="text-xl">Director: {movie.director}</p>
                        {/* Average Rating */}
                        <div className="mt-auto text-lg">
                          Average Rating: {average}/5
                        </div>
                      </div>
                      {/* Showing Times */}
                      <div className="w-fit">
                        {Object.entries(sessionsByDate).map(
                          ([date, sessions]) => (
                            <div key={date} className="flex flex-col p-2">
                              <div className="text-white text-xl font-semibold">
                                {date}
                              </div>
                              <div className="flex flex-row gap-2 p-2 cursor-pointer">
                                {sessions.map((session, i) => (
                                  <div
                                    key={i}
                                    className="text-white border-[1px] border-white px-3 py-1"
                                  >
                                    {FormatTime24Hours(session.time)}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              {/* Reviews Container */}
              <Card className="w-full !bg-[#282b2e] !p-4 flex !min-h-[500px] !max-h-[800px] !overflow-y-scroll !no-scrollbar">
                {/** User Reviews Container */}
                <div className="flex-grow h-fit min-h-[400px] flex flex-col">
                  <div className="w-full flex flex-row justify-between">
                    <div className="text-white text-3xl">
                      User Reviews ({reviews.length})
                    </div>
                    {userData && (
                      <div
                        className="border-[1px] border-purple-500 text-purple-500 py-2 px-4 cursor-pointer"
                        onClick={handleOpenReviewDialog}
                      >
                        + Review
                      </div>
                    )}
                  </div>
                  <div className="w-full flex flex-col flex-grow gap-8 mt-4">
                    {reviews &&
                      reviews.map((review) => (
                        <UserReview
                          key={review.id}
                          review={review}
                          userData={userData}
                          handleEditReview={(review) => setActiveReview(review)}
                          handleDeleteReview={handleDeleteReview}
                        />
                      ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
      {/** Write Review Dialog */}
      {movie && (
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <ReviewDialog close={handleCloseDialog} movieId={movie.id} />
        </Dialog>
      )}
      {/** Edit Review Dialog */}
      {activeReview && (
        <Dialog
          fullWidth
          maxWidth="sm"
          open={activeReview !== undefined}
          onClose={handleCloseEditDialog}
        >
          <EditReviewDialog
            close={handleCloseEditDialog}
            review={activeReview}
            movieId={activeReview.movieId}
          />
        </Dialog>
      )}
      {/* Ticket Booking Dialog */}
      {sessions && (
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openBookingDialog}
          onClose={() => setOpenBookingDialog(false)}
        >
          <BookingDialog
            close={(message) => handleCloseBookingDialog(message)}
            sessions={sessions}
          />
        </Dialog>
      )}
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
      <Snackbar
        open={snackbar !== ""}
        autoHideDuration={2500}
        message={snackbar}
        onClose={() => setSnackbar("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Fragment>
  );
};

export default Movie;
