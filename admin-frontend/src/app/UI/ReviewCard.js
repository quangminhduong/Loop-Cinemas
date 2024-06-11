import { Button } from "@mui/material";

const ReviewCard = ({ review, movieTitle, hideUnhide, view }) => {
  return (
    <div className="w-full h-[250px] p-4 bg-[#282b2e] rounded-sm flex flex-col text-white justify-between">
      <div className="w-full flex flex-col">
        <div className="font-semibold text-2xl">{review.username}</div>
        <div>Movie: {movieTitle}</div>
        <div className="mb-3">Rating: {review.rating}/5</div>
        <div className="line-clamp-3">{review.message}</div>
      </div>
      <div className="w-full flex items-center justify-between mt-4 gap-2">
        <Button type="button" variant="outlined" onClick={view}>
          View
        </Button>
        <Button type="button" variant="outlined" onClick={hideUnhide}>
          {review.hidden ? "Unhide" : "Hide"}
        </Button>
      </div>
    </div>
  );
};

export default ReviewCard;
