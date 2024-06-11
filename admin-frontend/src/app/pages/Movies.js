import { Fragment, createContext, useEffect, useState } from "react";
import { createMovie, getAllMovies } from "app/queries/movie-queries";
import { Button, Dialog, Snackbar } from "@mui/material";

import Header from "app/UI/Header";
import MovieGrid from "app/UI/MovieGrid";
import ManageMovieDialog from "app/UI/ManageMovieDialog";

export const MoviesContext = createContext();

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState("");

  useEffect(() => {
    loadAllMovies();
  }, []);

  const loadAllMovies = async () => {
    const allMovies = await getAllMovies();
    setMovies(allMovies);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDialogSubmit = async (data) => {
    const response = await createMovie(
      data.title,
      new Date(data.releaseDate).toString(),
      Number(data.runtime),
      data.director,
      data.description,
      data.poster
    );
    handleCloseDialog();
    if (response === null)
      setSnackbar("Failed to create movie. Please try again");
    else setSnackbar("Movie successfully created");
    loadAllMovies();
  };

  return (
    <Fragment>
      <Header />
      <MoviesContext.Provider value={{ movies }}>
        <div className="w-full h-full bg-[#121212] flex justify-center">
          <div className="flex flex-col w-full h-fit max-h-full max-w-[1920px] overflow-y-scroll no-scrollbar text-white px-6">
            <div className="flex flex-row items-center gap-8 mb-6">
              <div className="text-4xl">All Movies</div>
              <Button variant="outlined" onClick={() => setOpenDialog(true)}>
                Add Movie
              </Button>
            </div>
            <MovieGrid reloadMovies={loadAllMovies} />
          </div>
        </div>
      </MoviesContext.Provider>
      <Snackbar
        open={snackbar !== ""}
        autoHideDuration={2500}
        message={snackbar}
        onClose={() => setSnackbar("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <ManageMovieDialog
          movie={{}}
          type="create"
          close={handleCloseDialog}
          submit={handleDialogSubmit}
        ></ManageMovieDialog>
      </Dialog>
    </Fragment>
  );
};

export default Movies;
