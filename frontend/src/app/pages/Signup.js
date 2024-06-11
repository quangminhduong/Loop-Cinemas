import { useRef, useState, useEffect } from "react";
import { TextField, Button, Snackbar, ThemeProvider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MuiTheme } from "app/utils/mui-theme";
import { registerUser } from "app/api";
import sha256 from "js-sha256";
import Card from "app/UI/Card";

const Signup = () => {
  const user = JSON.parse(localStorage.getItem("activeUser"));
  // Keep the user where they are if they already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  const handleRegistration = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    const email = emailRef.current.value.trim();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirm = confirmRef.current.value.trim();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      setEmailError("Invalid email address");
      return;
    }

    // Password validation
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    // Error checking (password match)
    if (password !== confirm) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");

    // Send registration data to the backend using Axios
    try {
      await registerUser({
        email,
        username,
        password: sha256(password),
      });
      setSnackbar(true);
    } catch(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { data } = error.response;
        if (data && data.message) {
          // Update error messages based on the response from the server
          if (data.message.includes('email')) {
            setEmailError(data.message);
          } else if (data.message.includes('username')) {
            setUsernameError(data.message);
          } else {
            setPasswordError(data.message);
          }
        } else {
          console.error('Error during registration:', error);
        }
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error during registration:', error.message);
      }
    };
  };

  return (
    <div className="w-full h-full bg-[url('app/assets/blob-background.svg')] flex flex-col items-end justify-center bg-cover text-white">
      <h1
        className="absolute top-6 left-6 text-[#ba6dec] text-6xl font-extrabold font-limelight cursor-pointer"
        onClick={() => navigate("/")}
      >
        Loop Cinemas
      </h1>
      <Card className="w-[500px] mr-16 !bg-[#282b2e]">
        <form className="flex flex-col gap-4" onSubmit={handleRegistration}>
          <h1 className="p-0 mb-4 text-2xl font-bold" data-testid="signup-title">Signup</h1>
          <ThemeProvider theme={MuiTheme}>
            <TextField
              error={emailError !== ""}
              helperText={emailError}
              variant="outlined"
              label="Email"
              inputRef={emailRef}
              required={true}
              color="secondary"
              inputProps={{ "data-testid": "email-input" }}
            ></TextField>
            <TextField
              error={usernameError !== ""}
              helperText={usernameError}
              variant="outlined"
              label="Username"
              inputRef={usernameRef}
              required={true}
              color="secondary"
              inputProps={{ "data-testid": "username-input" }}
            ></TextField>
            <div className="w-full flex flex-row justify-between gap-4">
              <TextField
                className="w-full"
                error={passwordError !== ""}
                helperText={passwordError}
                variant="outlined"
                label="Password"
                inputRef={passwordRef}
                type="password"
                required={true}
                color="secondary"
                inputProps={{ "data-testid": "password-input" }}
              ></TextField>
              <TextField
                className="w-full"
                error={passwordError !== ""}
                helperText={passwordError}
                variant="outlined"
                label="Confirm Password"
                inputRef={confirmRef}
                type="password"
                required={true}
                color="secondary"
                inputProps={{ "data-testid": "confirm-password-input" }}
              ></TextField>
            </div>
          </ThemeProvider>
          <div className="flex flex-row justify-between items-center mt-2">
            <p>
              Already have an account?{" "}
              <Link className="font-semibold" to="/login">
                Login
              </Link>
            </p>
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="secondary"
              data-testid="signup-button"
            >
              Signup
            </Button>
          </div>
        </form>
      </Card>
      <Snackbar
        open={snackbar}
        autoHideDuration={5000}
        onClose={() => navigate("/login")}
        message="Account creation successful! Returning to login"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        data-testid="success-snackbar"
      />
      <div hidden >{snackbar}</div>
    </div>
  );
};

export default Signup;
