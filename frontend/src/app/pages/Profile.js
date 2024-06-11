import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetMoviePoster, GetMovieTitle } from "app/utils/movie-utils";
import { Button, Dialog, Snackbar } from "@mui/material";
import { FormatDate, FormatTime24Hours } from "app/utils/format";
import {
  deleteUser,
  getMovies,
  getUserReviews,
  getUserBookings,
  updateUserById,
  cancelBooking,
  deleteReview,
  getUserById,
} from "app/api";

import Header from "app/UI/Header";
import Footer from "app/UI/Footer";
import ProfileCard from "app/UI/ProfileCard";
import EditReviewDialog from "app/UI/EditReviewDialog";

const Profile = ({ api }) => {
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeReview, setActiveReview] = useState({});
  const [snackbar, setSnackbar] = useState("");
  const [activeUser, setActiveUser] = useState(
    JSON.parse(localStorage.getItem("activeUser"))
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const [moviesResponse, reviewsResponse, bookingsResponse] =
          await Promise.all([
            getMovies(),
            getUserReviews(activeUser.id),
            getUserBookings(activeUser.id),
          ]);
        setMovies(moviesResponse);
        setReviews(reviewsResponse.data);
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error("Error fetching movies and reviews:", error);
      }
    };

    fetchPageData();
  }, [api, activeUser]);

  const handleEditProfile = async (updatedUser) => {
    // Try send the user update to the api
    try {
      const response = await updateUserById(activeUser.id, {
        username: updatedUser.username,
        email: updatedUser.email,
        password: updatedUser.password,
      });

      if (response.status === 200) {
        const userResponse = await getUserById(activeUser.id);

        // Update active user in localStorage
        localStorage.removeItem("activeUser");
        localStorage.setItem("activeUser", JSON.stringify(userResponse));

        // Notify the user about successful profile update
        setSnackbar("Profile updated successfully!");

        // Redirect to the login page after editing the profile
        setActiveUser(userResponse);
      } else {
        console.error("Failed to update user profile: ", response.data);
        setSnackbar("Failed to update profile. Please try again");
      }
    } catch (error) {
      console.error("Error updating user profile: ", error);
      setSnackbar("Failed to update profile. Please try again");
    }
  };

  const handleDeleteProfile = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );
    if (!confirm) return;

    // First delete all bookings
    try {
      for (const booking of bookings) {
        const response = await cancelBooking(booking.booking_id);
        if (response.status === 200) continue;
        console.error("Failed to delete user profile:", response.data);
        setSnackbar("Failed to delete profile. Please try again");
        return;
      }
    } catch (error) {
      console.error("Error deleting user profile:", error);
      setSnackbar("Failed to delete profile. Please try again");
    }

    // Then delete all reviews
    try {
      for (const review of reviews) {
        const response = await deleteReview(review.id);
        if (response.status === 200) continue;
        console.error("Failed to delete user profile:", response.data);
        setSnackbar("Failed to delete profile. Please try again");
        return;
      }
    } catch (error) {
      console.error("Error deleting user profile:", error);
      setSnackbar("Failed to delete profile. Please try again");
    }

    // Finally, delete the profile
    try {
      const response = await deleteUser(activeUser.id);
      if (response.status === 200) {
        console.log("User profile deleted successfully:", response.data);
        // Clear activeUser from localStorage
        localStorage.removeItem("activeUser");
        // Redirect to the login page after deleting the profile
        navigate("/");
      } else {
        console.error("Failed to delete user profile:", response.data);
        setSnackbar("Failed to delete profile. Please try again");
      }
    } catch (error) {
      console.error("Error deleting user profile:", error);
      setSnackbar("Failed to delete profile. Please try again");
    }
  };

  const handleCancelBooking = async (booking_id) => {
    const confirm = window.confirm(
      "Are you sure we want to cancel this booking? This action cannot be undone."
    );
    if (!confirm) return;

    try {
      const response = await cancelBooking(booking_id);
      if (response.status === 200) {
        setSnackbar("Booking cancelled!");

        const bookingResponse = await getUserBookings(activeUser.id);
        if (bookingResponse.status === 200) setBookings(bookingResponse.data);
      } else {
        console.error("Failed to cancel booking: ", response.data);
        setSnackbar("Failed to cancel booking. Please try again");
      }
    } catch (error) {
      console.error("There was an error cancelling the booking: ", error);
      setSnackbar("Failed to cancel booking. Please try again");
    }
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
        const reviewResponse = await getUserReviews(activeUser.id);
        if (reviewResponse.status === 200) setReviews(reviewResponse.data);
      } else {
        console.error("Failed to delete review: ", response.data);
        setSnackbar("Failed to delete review. Please try again");
      }
    } catch (error) {
      console.error("There was an error deleting the review: ", error);
      setSnackbar("Failed to delete review. Please try again");
    }

    setSnackbar("Review deleted");
  };

  const handleEditReview = (review) => {
    // Open the review editing dialog
    setOpenDialog(true);
    setActiveReview(review);
  };

  const handleCloseDialog = async () => {
    // Close the dialog
    setOpenDialog(false);
    // Clear the active review
    setActiveReview({});
    // Get the latest review data
    try {
      const response = await getUserReviews(activeUser.id);
      if (response.status === 200) setReviews(response.data);
      else
        setSnackbar(
          "There was an error retrieving the latest page data. Please reload the page"
        );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Header user={activeUser} />
      <div className="w-full h-full flex flex-col relative bg-[#121212] overflow-y-scroll no-scrollbar text-white">
        <div className="w-full flex items-center justify-center pb-[50px]">
          <div className="w-full max-w-[1920px] flex flex-row gap-8 p-8">
            <div className="flex flex-col">
              <ProfileCard
                activeUser={activeUser}
                updateUser={handleEditProfile}
                deleteUser={handleDeleteProfile}
              />
              <div className="text-4xl my-4">Your Bookings</div>
              {bookings &&
                bookings.map((booking) => (
                  <div
                    key={booking.booking_id}
                    className="p-4 border-[1px] border-white my-2 flex"
                  >
                    <div className="flex flex-col min-w-fit">
                      <div className="text-xl mb-2 font-bold">
                        {GetMovieTitle(booking.movie_id, movies)}
                      </div>
                      <div>
                        {FormatDate(booking.session_time)} at{" "}
                        {FormatTime24Hours(booking.session_time)}
                      </div>
                      <div className="font-semibold">
                        {booking.num_tickets} tickets booked
                      </div>
                    </div>
                    <div className="flex flex-col justify-end w-full items-end">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleCancelBooking(booking.booking_id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col flex-grow gap-4">
              <div className="text-4xl mb-4">Your Reviews</div>
              {reviews &&
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="w-full border-[1px] border-white p-4 flex flex-row gap-4"
                  >
                    <img
                      className="h-[150px] max-w-[100px]"
                      src={GetMoviePoster(review.movie_id, movies)}
                      alt="movie-poster"
                    />
                    <div className="flex-grow flex flex-col text-white">
                      <div className="flex flex-row w-full justify-between items-center">
                        <Link
                          className="text-2xl"
                          to={`/movie/${review.movie_id}`}
                        >
                          {GetMovieTitle(review.movie_id, movies)}
                        </Link>
                        <div className="flex flex-row gap-2">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleEditReview(review)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteReview(review)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="text-base">
                        Your Rating: {review.rating}/5
                      </div>
                      <div
                        className="text-xl mt-2"
                        dangerouslySetInnerHTML={{ __html: review.message }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <EditReviewDialog
          close={handleCloseDialog}
          review={activeReview}
          movieId={activeReview.movieId}
        />
      </Dialog>
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

export default Profile;
