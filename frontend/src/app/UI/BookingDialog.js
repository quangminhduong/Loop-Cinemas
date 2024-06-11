import {
  ThemeProvider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { createBooking } from "app/api";
import { FormatDate, FormatTime24Hours } from "app/utils/format";
import { MuiTheme } from "app/utils/mui-theme";
import { useState } from "react";

const BookingDialog = ({ sessions, close }) => {
  const [session, setSession] = useState(sessions[0]);
  const [tickets, setTickets] = useState(1);

  const userData = JSON.parse(localStorage.getItem("activeUser"));

  // Create the booking for the session
  const handleCreateBooking = async () => {
    try {
      const response = await createBooking({
        movie_id: session.movie_id,
        user_id: userData.id,
        session_id: session.id,
        num_tickets: tickets,
      });
      if (response.status === 200) {
        // Close with success message
        close("Tickets booked successfully!");
      } else {
        // Close with fail message
        close("Failed to book tickets. Please try again");
      }
    } catch (error) {
      console.error("There was an error booking the tickets: ", error);
    }
  };

  return (
    <div className="w-full p-6 gap-4 bg-[#282b2e] flex flex-col text-white">
      <div className="text-3xl font-semi-bold">Book Tickets</div>
      <ThemeProvider theme={MuiTheme}>
        <div className="flex flex-col w-full gap-4">
          {/* Session Selection */}
          <FormControl fullWidth required color="secondary">
            <InputLabel id="session-label">Session</InputLabel>
            <Select
              labelId="session-label"
              id="session"
              value={session}
              label="Session"
              sx={{ color: "white" }}
              onChange={(event) => setSession(event.target.value)}
            >
              {sessions.length > 0 &&
                sessions.map((session) => (
                  <MenuItem key={session.id} value={session}>
                    {FormatDate(session.time)} |{" "}
                    {FormatTime24Hours(session.time)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {/* Ticket Quantity Selection */}
          {session.available_seats > 0 && (
            <FormControl fullWidth required color="secondary">
              <InputLabel id="ticket-label">Ticket Quantity</InputLabel>
              <Select
                labelId="ticket-label"
                id="tickets"
                value={tickets}
                label="Ticket Quantity"
                sx={{ color: "white" }}
                onChange={(event) => setTickets(event.target.value)}
              >
                {Array.from({ length: session.available_seats }, (_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {/* Message if no tickets available */}
          {session.available_seats === 0 && (
            <div>No tickets available for this session</div>
          )}
        </div>
      </ThemeProvider>
      <div className="w-full flex flex-row justify-end gap-4">
        <Button variant="outlined" color="secondary" onClick={() => close("")}>
          Cancel
        </Button>
        <Button
          disabled={session.available_seats === 0}
          variant="contained"
          color="secondary"
          onClick={() => {
            handleCreateBooking();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BookingDialog;
