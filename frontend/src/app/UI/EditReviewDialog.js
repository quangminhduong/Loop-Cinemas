import {
  ThemeProvider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@mui/material";
import { MuiTheme } from "app/utils/mui-theme";
import { useState } from "react";
import { editReview } from "app/api";

//const EditReviewDialog = ({ review, movieId, close}) => {
const EditReviewDialog = ({ review, close, api }) => {
  const [rating, setRating] = useState(review.rating);
  const [message, setMessage] = useState(review.message);
  const [ratingError, setRatingError] = useState("");
  const [messageError, setMessageError] = useState("");
  const userData = JSON.parse(localStorage.getItem('activeUser'));
  
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const handleFormSubmit = async () => {
    // Check errors in the form
    let formValid = true;
    // Check rating value
    if (!rating) {
      setRatingError("Rating is required");
      formValid = false;
    }
    // Check message value
    if (!message || message.length === 0) {
      setMessageError("Message is required");
      formValid = false;
    }
    if (message.length > 250) {
      setMessageError("Message cannot exceed 250 characters");
      formValid = false;
    }
    if (!formValid) return;

    try {
      const editedReview = {
        id: review.id,
        username: review.username,
        userId: review.user_id,
        rating: rating,
        message: message,
        timestamp: review.timestamp,
        movieId: review.movie_id,
      };

      // Send a PUT request to update the review
      await editReview(review.id, editedReview);
      close();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };
  return (
    <div className="w-full p-6 gap-4 bg-[#282b2e] flex flex-col text-white">
      <div className="text-3xl font-semibold">Write a Review</div>
      <ThemeProvider theme={MuiTheme}>
        <div className="flex flex-row w-full gap-4">
          <TextField
            className="w-full"
            id="username"
            label="Username"
            variant="outlined"
            color="secondary"
            value={review.username}
          />
          <FormControl fullWidth required color="secondary">
            <InputLabel id="rating-label">Rating</InputLabel>
            <Select
              error={ratingError !== ""}
              labelId="rating-label"
              id="rating"
              value={rating}
              label="Rating"
              sx={{ color: "white" }}
              onChange={(event) => setRating(event.target.value)}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <MenuItem key={index} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d32f2f" }}>
              {ratingError}
            </FormHelperText>
          </FormControl>
        </div>
      </ThemeProvider>
      <ThemeProvider theme={MuiTheme}>
        <TextField
          error={messageError !== ""}
          helperText={messageError}
          id="message"
          label="Message"
          variant="outlined"
          color="secondary"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          multiline
          required
          rows={5}
          inputProps={{ maxLength: 250 }}
        />
        <div className="text-sm mt-[-10px]">
          {600 - stripHtmlTags(message).length} characters remaining
        </div>
      </ThemeProvider>
      <div className="w-full flex flex-row justify-end gap-4">
        <Button variant="outlined" color="secondary" onClick={close}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFormSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EditReviewDialog;
