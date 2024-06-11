import { Fragment, useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import { MuiTheme } from "app/utils/mui-theme";

import Header from "app/UI/Header";
import Footer from "app/UI/Footer";
import MovieCard from "app/UI/MovieCard";
import Card from "app/UI/Card";
import {
  GetAverageRating,
  GetMoviesAscendingOrder,
  GetMoviesDescendingOrder,
} from "app/utils/movie-utils";
import { getMovies, getMovieReviews, getUserById } from "app/api";

const Landing = () => {
  const [movies, setMovies] = useState([]);
  const [sorting, setSorting] = useState("default");
  const [activeUser, setActiveUser] = useState(
    JSON.parse(localStorage.getItem("activeUser"))
  );

  const fetchMoviesFromApi = async () => {
    try {
      const response = await getMovies();

      // Fetch reviews for each movie and calculate the average rating
      const moviesWithAvgRating = await Promise.all(
        response.map(async (movie) => {
          try {
            const reviewsResponse = await getMovieReviews(movie.id);

            // Extract the ratings from reviews
            const ratings = reviewsResponse.map((review) => review.rating);
            const avgRating = GetAverageRating(ratings);

            return { ...movie, avgRating };
          } catch (error) {
            console.error(
              `Error fetching reviews for movie ${movie.id}:`,
              error
            );
            return movie;
          }
        })
      );

      setMovies(moviesWithAvgRating);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchLatestUserInfo = async () => {
    if (!activeUser) return;
    try {
      const response = await getUserById(activeUser.id);
      setActiveUser(response);
      localStorage.setItem("activeUser", JSON.stringify(response));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatestUserInfo();
    fetchMoviesFromApi();
  }, []);

  const handleSortingSelect = (event) => {
    const value = event.target.value;
    setSorting(value);
    if (value === "ascending") {
      setMovies(GetMoviesAscendingOrder([...movies]));
    } else if (value === "descending") {
      setMovies(GetMoviesDescendingOrder([...movies]));
    } else {
      fetchMoviesFromApi();
    }
  };
  return (
    <Fragment>
      <Header user={activeUser} />
      <div className="w-full h-full flex flex-col relative bg-[#121212] overflow-y-scroll no-scrollbar">
        <div className="w-full flex items-center justify-center absolute pb-[50px]">
          <div className="w-full max-w-[1920px] flex flex-row gap-8 p-8">
            <div className="flex-grow h-full flex flex-col gap-4">
              <div className="w-full flex flex-row justify-between pt-2 items-center mb-4">
                <div className="text-white text-4xl font-bold">
                  Currently Showing
                </div>
                <ThemeProvider theme={MuiTheme}>
                  <FormControl color="secondary" className="w-[200px]">
                    <InputLabel id="sorting-label">Sorting</InputLabel>
                    <Select
                      labelId="sorting-label"
                      id="sorting"
                      label="Sorting"
                      value={sorting}
                      onChange={handleSortingSelect}
                      sx={{ color: "white" }}
                    >
                      <MenuItem value="default">Default</MenuItem>
                      <MenuItem value="ascending">Lowest Rated</MenuItem>
                      <MenuItem value="descending">Highest Rated</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>
              </div>

              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.title} />
              ))}
            </div>
            <div className="w-[400px] h-full flex flex-col gap-8">
              <div className="text-white text-4xl font-bold pt-4 pb-2">
                Top Movies
              </div>
              <Card className="!bg-[#282b2e] min-h-[500px] flex flex-col gap-4 !overflow-y-scroll !no-scrollbar">
                {GetMoviesDescendingOrder([...movies]).map((movie, i) => (
                  <div
                    key={movie.title}
                    className="flex flex-row gap-4 text-white"
                  >
                    <div className="text-4xl">{i + 1}.</div>
                    <div className="flex flex-col">
                      <div className="text-3xl font-semibold">
                        {movie.title}
                      </div>
                      <div className="text-base">
                        Avg. Rating: {movie.avgRating}/5
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </Fragment>
  );
};

export default Landing;
