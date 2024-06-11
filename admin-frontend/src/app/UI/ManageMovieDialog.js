import { ThemeProvider, TextField, Button } from "@mui/material";
import { FormatDate } from "app/utils/format";
import { MuiTheme } from "app/utils/mui-theme";
import { useEffect, useState } from "react";

const ManageMovieDialog = ({ movie, close, type, submit }) => {
  // Input Values
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState("");
  const [director, setDirector] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  // Input Errors
  const [titleError, setTitleError] = useState("");
  const [releaseDateError, setReleaseDateError] = useState("");
  const [runtimeError, setRuntimeError] = useState("");
  const [directorError, setDirectorError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [posterError, setPosterError] = useState("");

  useEffect(() => {
    if (type === "edit") {
      setTitle(movie.title);
      setReleaseDate(FormatDate(Number(movie.release_date)));
      setRuntime(movie.runtime);
      setDirector(movie.director);
      setPoster(movie.poster);
      setDescription(movie.description);
    }
  }, [type, movie]);

  const handleSubmit = () => {
    // Clear all errors initially
    setTitleError("");
    setReleaseDateError("");
    setRuntimeError("");
    setDirectorError("");
    setDescriptionError("");
    setPosterError("");

    // Error handling for title
    if (!title || title.length === 0) {
      setTitleError("Title is required");
      return;
    }

    // Error handling for director
    if (!director || director.length === 0) {
      setDirectorError("Director is required");
      return;
    }

    // Error handling for release date
    if (!releaseDate || releaseDate.length === 0) {
      setReleaseDateError("Release date is required");
      return;
    }

    // Error handling for if release date is not a date
    try {
      const releaseDateObj = new Date(releaseDate);
      if (!releaseDateObj.getDate()) throw new Error();
    } catch (error) {
      setReleaseDateError("Release date must be a valid date");
      return;
    }

    // Error handling for runtime
    if (!runtime || runtime.length === 0) {
      setRuntimeError("Runtime is required");
      return;
    }

    // Error handling for runtime not being a number
    try {
      const runtimeNum = Number(runtime);
      if (!runtimeNum) throw new Error();
    } catch (error) {
      setRuntimeError("Runtime must be a valid number");
      return;
    }

    // Error handling for poster
    if (!poster || poster.length === 0) {
      setPosterError("Poster is required");
      return;
    }

    // Error handling for description
    if (!description || description.length === 0) {
      setDescriptionError("Description is required");
      return;
    }

    submit({
      title: title,
      director: director,
      releaseDate: releaseDate,
      runtime: runtime,
      poster: poster,
      description: description,
    });
  };

  return (
    <div className="w-full p-6 gap-4 bg-[#282b2e] flex flex-col text-white">
      <div className="text-3xl font-semi-bold">
        {type === "edit"
          ? `Edit Movie With ID: ${movie.id}`
          : "Create New Movie"}
      </div>
      <ThemeProvider theme={MuiTheme}>
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-row w-full gap-4">
            <TextField
              error={titleError.length > 0}
              helperText={titleError}
              fullWidth
              className="w-full"
              id="title"
              label="Title"
              variant="outlined"
              color="secondary"
              value={title}
              required
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              error={directorError.length > 0}
              helperText={directorError}
              fullWidth
              className="w-full"
              id="director"
              label="Director"
              variant="outlined"
              color="secondary"
              value={director}
              required
              onChange={(event) => setDirector(event.target.value)}
            />
          </div>
          <div className="flex flex-row w-full gap-4">
            <TextField
              error={releaseDateError.length > 0}
              helperText={releaseDateError}
              fullWidth
              className="w-full"
              id="release-date"
              label="Release Date (23 May 22)"
              variant="outlined"
              color="secondary"
              value={releaseDate}
              required
              onChange={(event) => setReleaseDate(event.target.value)}
            />
            <TextField
              error={runtimeError.length > 0}
              helperText={runtimeError}
              fullWidth
              className="w-full"
              id="runtime"
              label="Runtime (minutes)"
              variant="outlined"
              color="secondary"
              value={runtime}
              required
              onChange={(event) => setRuntime(event.target.value)}
            />
          </div>
          <div className="w-full">
            <TextField
              error={posterError.length > 0}
              helperText={posterError}
              fullWidth
              className="w-full"
              id="poster"
              label="Poster URL"
              variant="outlined"
              color="secondary"
              value={poster}
              required
              onChange={(event) => setPoster(event.target.value)}
            />
          </div>
          <div className="w-full">
            <TextField
              error={descriptionError.length > 0}
              helperText={descriptionError}
              fullWidth
              className="w-full"
              id="description"
              label="Description"
              variant="outlined"
              color="secondary"
              value={description}
              multiline
              required
              rows={5}
              inputProps={{ maxLength: 600 }}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
      </ThemeProvider>
      <div className="w-full flex flex-row justify-end gap-4">
        <Button variant="outlined" color="secondary" onClick={() => close()}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          data-testid="submit-review"
          onClick={handleSubmit}
        >
          {type === "edit" ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  );
};

export default ManageMovieDialog;
