import { useState } from "react";
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { MuiTheme } from "app/utils/mui-theme";
import { getUserReviews } from "app/api";

import { createReview } from "app/api";
const ReviewDialog = ({ close, movieId }) => {
  // State variables to manage form inputs and error messages
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [messageError, setMessageError] = useState("");

  // Fetch active user from localStorage
  const userData = JSON.parse(localStorage.getItem("activeUser"));

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    // Fetch reviews created by the user within the last 24 hours
    try {
      const response = await getUserReviews(userData.id);
      const userReviews24hr = response.data.filter((review) => {
        const reviewTimestamp = new Date(review.createdAt).getTime();
        const currentTime = new Date().getTime();
        const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        return (
          reviewTimestamp >= twentyFourHoursAgo &&
          reviewTimestamp <= currentTime
        );
      });

      // Check if the user has exceeded the review limit (3 reviews within 24 hours)
      if (userReviews24hr.length >= 3) {
        alert("You have exceeded the review limit.");
        return;
      }
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      // Handle the error as needed
    }

    // Check errors in the form
    let formValid = true;
    // Check rating value
    if (!rating) {
      setRatingError("Rating is required");
      formValid = false;
    }
    // Check message value
    const plainMessage = stripHtmlTags(message);
    if (!plainMessage || plainMessage.length === 0) {
      setMessageError("Message is required");
      formValid = false;
    }
    if (plainMessage.length > 600) {
      setMessageError("Message cannot exceed 600 characters");
      formValid = false;
    }

    if (!formValid) return;

    // If the form is fine, add the new review
    const reviewData = {
      movieId,
      userId: userData.id,
      username: userData.username,
      rating: parseInt(rating, 10),
      message,
    };

    try {
      console.log("handleFormSubmit called");
      // Send a POST request to create a new review
      await createReview(reviewData);
      close();
    } catch (error) {
      console.error("Error submitting review:", error);
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
            value={userData.username}
            inputProps={{ "data-testid": "username" }}
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
              inputProps={{ "data-testid": "rating-input" }}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <MenuItem
                  key={index}
                  value={index + 1}
                  inputProps={{ "data-testid": "rating-input" }}
                >
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
          inputProps={{ maxLength: 600, "data-testid": "message-input" }}
        />
        <div className="text-sm mt-[-10px]" data-testid="characters-remain">
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
          data-testid="submit-review"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ReviewDialog;
