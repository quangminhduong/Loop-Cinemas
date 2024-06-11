import { Button } from "@mui/material";

const ReviewDialog = ({ review, hideUnhide, close }) => {
  return (
    <div className="w-full p-6 gap-4 bg-[#282b2e] flex flex-col text-white">
      <div className="text-3xl font-semi-bold">
        Viewing Review With ID: {review.id}
      </div>
      <div className="flex w-full flex-row gap-2">
        <div className="font-semibold text-xl">User:</div>
        <div className="text-lg">{review.username}</div>
      </div>
      <div className="flex w-full flex-row gap-2">
        <div className="font-semibold text-xl">Rating:</div>
        <div className="text-lg">{review.rating}/5</div>
      </div>
      <div className="flex w-full flex-row gap-2">
        <div className="font-semibold text-xl">Message:</div>
        <div className="text-lg">{review.message}</div>
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-4 mt-4">
        <Button type="button" variant="outlined" onClick={close}>
          Close
        </Button>
        <Button type="button" variant="outlined" onClick={hideUnhide}>
          {review.hidden ? "Unhide Review" : "Hide Review"}
        </Button>
      </div>
    </div>
  );
};

export default ReviewDialog;
