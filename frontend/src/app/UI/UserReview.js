import { Button } from "@mui/material";

const UserReview = ({ review, handleEditReview, handleDeleteReview }) => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  return (
    <div className="flex flex-row w-full gap-4">
      <div className="h-full">
        <span className="material-symbols-outlined text-white mt-1 mr-[-5px]">
          account_circle
        </span>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-2xl font-semibold">
            {review.username}
          </div>
          {activeUser && review.username === activeUser.username && (
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
          )}
        </div>
        <div className="text-white text-base mb-2">
          Score: {review.rating}/5
        </div>
        <div className="text-white text-xl">
          {review.hidden
            ? "<-- THIS REVIEW HAS BEEN HIDDEN BY AN ADMIN -->"
            : review.message}
        </div>
      </div>
    </div>
  );
};

export default UserReview;
