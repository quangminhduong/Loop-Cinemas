import { useEffect, useState } from "react";
import { FormatTime24Hours, FormatDate } from "app/utils/format";
import { getAllMovieSessions } from "app/queries/session-queries";

import Card from "./Card";
import { Button } from "@mui/material";
import { getAllMovieReviews } from "app/queries/review-queries";
import { GetAverageRating } from "app/utils/movie-utils";

const MovieCard = ({ movie, editMovie }) => {
  const [sessionsByDate, setSessionsByDate] = useState({});
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    getSessionInformation();
    getAverageRating();
  }, []);

  // Get all sessions and update session information
  const getSessionInformation = async () => {
    const sessions = await getAllMovieSessions(Number(movie.id));

    // Group sessions by date
    const groupedSessions = {};
    sessions.forEach((session) => {
      const date = FormatDate(Number(session.time));
      if (!groupedSessions[date]) {
        groupedSessions[date] = [];
      }
      groupedSessions[date].push(session);
    });

    setSessionsByDate(groupedSessions);
  };

  // Get the average rating for the movie
  const getAverageRating = async () => {
    const reviews = await getAllMovieReviews(Number(movie.id));
    // Extract the ratings from reviews
    const ratings = reviews.map((review) => review.rating);
    // Calculate the average rating
    const avgRating = GetAverageRating(ratings);
    setAverageRating(avgRating);
  };

  return (
    <Card className="!bg-[#282b2e] !p-2">
      {/* Main content container */}
      <div className="flex flex-row gap-4">
        {/* Poster Image */}
        <img className="h-[280px] w-[180px]" src={movie.poster} alt="poster" />
        {/* Information Container */}
        <div className="flex-grow w-full min-h-full flex flex-col text-white justify-between items-start">
          <div>
            <div className="font-semibold text-2xl">{movie.title}</div>
            <div className="flex flex-col gap-2 mb-4">
              {/* Director information */}
              <p className="text-xl">Director: {movie.director}</p>
            </div>
            {/* Runtime and Rating */}
            <div className="flex flex-row gap-4 mt-2">
              <p className="text-basE">Runtime: {movie.runtime}</p>
              <img
                className="w-6 h-6"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Australian_Classification_Mature_%28M%29.svg/2048px-Australian_Classification_Mature_%28M%29.svg.png"
                alt="rating-icon"
              />
            </div>
            <div>Average viewer rating: {averageRating}/5</div>
          </div>
          <Button variant="outlined" onClick={editMovie}>
            Edit Movie
          </Button>
        </div>
        {/* Session Times */}
        <div className="w-[600px] min-h-full border-white">
          {Object.entries(sessionsByDate).map(([date, sessions]) => (
            <div key={date} className="flex flex-col p-2">
              <div className="text-white text-xl font-semibold">{date}</div>
              <div className="flex flex-row gap-2 p-2">
                {sessions.map((session, i) => (
                  <div
                    key={i}
                    className="text-white border-[1px] border-white px-3 py-1"
                  >
                    {FormatTime24Hours(Number(session.time))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
