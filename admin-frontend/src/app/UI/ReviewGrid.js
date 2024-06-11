import { Fragment, useContext, useState } from "react";
import { ReviewsContext } from "app/pages/Reviews";
import { Snackbar, Dialog } from "@mui/material";
import { hideUnhideReview } from "app/queries/review-queries";

import ReviewCard from "./ReviewCard";
import ReviewDialog from "./ReviewDialog";

const ReviewGrid = ({ reloadReviews }) => {
  const [snackbar, setSnackbar] = useState("");
  const [activeReview, setActiveReview] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const context = useContext(ReviewsContext);

  const getMovieTitle = (movieId) => {
    const movie = context.movies.find((movie) => movie.id === movieId);
    if (movie) return movie.title;
    return "";
  };

  const handleViewReview = (review) => {
    setActiveReview(review);
    setOpenDialog(true);
  };

  const handleHideUnhideReview = async (review) => {
    setOpenDialog(false);
    const response = await hideUnhideReview(
      Number(review.id),
      review.hidden ? false : true
    );
    if (response !== null) setSnackbar("Review status updated");
    else setSnackbar("Failed to update review status. Please try again");
    setActiveReview({});
    reloadReviews();
  };

  return (
    <Fragment>
      <div className="w-full h-full grid grid-cols-6 grid-rows-none gap-2 overflow-y-scroll no-scrollbar">
        {context.reviews &&
          context.reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              movieTitle={getMovieTitle(review.movie_id)}
              view={() => handleViewReview(review)}
              hideUnhide={() => handleHideUnhideReview(review)}
            />
          ))}
      </div>
      <Snackbar
        open={snackbar !== ""}
        autoHideDuration={2500}
        message={snackbar}
        onClose={() => setSnackbar("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      {/* View Full Review Dialog */}
      {activeReview && (
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <ReviewDialog
            review={activeReview}
            hideUnhide={() => handleHideUnhideReview(activeReview)}
            close={() => setOpenDialog(false)}
          />
        </Dialog>
      )}
    </Fragment>
  );
};

export default ReviewGrid;
