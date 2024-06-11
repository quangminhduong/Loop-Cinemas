import { MoviesContext } from "app/pages/Movies";
import { useContext, useState, Fragment } from "react";
import { Snackbar, Dialog } from "@mui/material";

import MovieCard from "./MovieCard";
import ManageMovieDialog from "./ManageMovieDialog";
import { updateMovie } from "app/queries/movie-queries";

const MovieGrid = ({ reloadMovies }) => {
  const [snackbar, setSnackbar] = useState("");
  const [activeMovie, setActiveMovie] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const context = useContext(MoviesContext);

  const handleEditMovie = (movie) => {
    setActiveMovie(movie);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setActiveMovie({});
    setOpenDialog(false);
  };

  const handleDialogSubmit = async (data) => {
    const movieId = Number(activeMovie.id);
    const response = await updateMovie(
      movieId,
      data.title,
      new Date(data.releaseDate).toString(),
      Number(data.runtime),
      data.director,
      data.description,
      data.poster
    );
    handleCloseDialog();
    if (response === null)
      setSnackbar("Failed to update movie. Please try again");
    else setSnackbar("Movie successfully updated");
    reloadMovies();
  };

  return (
    <Fragment>
      <div className="w-full h-full grid grid-cols-2 grid-rows-none gap-2 overflow-y-scroll no-scrollbar">
        {context.movies &&
          context.movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              editMovie={() => handleEditMovie(movie)}
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
      {/* Edit Movie Dialog */}
      {activeMovie && (
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <ManageMovieDialog
            movie={activeMovie}
            type="edit"
            close={handleCloseDialog}
            submit={handleDialogSubmit}
          ></ManageMovieDialog>
        </Dialog>
      )}
    </Fragment>
  );
};

export default MovieGrid;
