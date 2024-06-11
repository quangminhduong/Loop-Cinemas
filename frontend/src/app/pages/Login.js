import { useRef, useState } from "react";
import { TextField, Button, Snackbar, ThemeProvider } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { MuiTheme } from "app/utils/mui-theme";
import { login } from "app/api";

import sha256 from "js-sha256";
import Card from "app/UI/Card";

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    try {
      // Make api call to login
      const response = await login(email, sha256(password));
      setSnackbar(true);
      // Log the user in and add current user information to the localStorage
      const userFound = response.user;
      localStorage.setItem("activeUser", JSON.stringify(userFound));
    } catch (error) {
      // Set error messages based on the API error response
      setEmailError("Invalid email or password" || "An error occurred");
      setPasswordError("Invalid email or password" || "An error occurred");
    }
  };

  return (
    <div className="w-full bg-[url('app/assets/blob-background.svg')] h-full flex flex-col items-end justify-center bg-cover text-white">
      <h1
        className="absolute top-6 left-6 text-[#ba6dec] text-6xl font-extrabold font-limelight cursor-pointer"
        onClick={() => navigate("/")}
      >
        Loop Cinemas
      </h1>
      <Card className="w-[500px] mr-16 ml-16 !bg-[#282b2e]">
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <h1 className="p-0 mb-4 text-2xl font-bold">Login</h1>
          <ThemeProvider theme={MuiTheme}>
            <TextField
              error={emailError.length > 0}
              helperText={emailError}
              variant="outlined"
              label="Email"
              inputRef={emailRef}
              required={true}
              color="secondary"
              inputProps={{ "data-testid": "email-input" }}
            ></TextField>
            <TextField
              className="w-full"
              error={passwordError.length > 0}
              helperText={passwordError}
              variant="outlined"
              label="Password"
              inputRef={passwordRef}
              type="password"
              required={true}
              color="secondary"
              inputProps={{ "data-testid": "password-input" }}
            ></TextField>
          </ThemeProvider>
          <div className="flex flex-row justify-between items-center mt-2">
            <p>
              Don't have an account?{" "}
              <Link className="font-semibold" to="/register">
                Signup
              </Link>
            </p>
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="secondary"
              data-testid="submit-button"
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
      <Snackbar
        open={snackbar}
        autoHideDuration={2500}
        onClose={() => navigate("/")}
        message="Login successful!"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        data-testid="success-snackbar"
      />
    </div>
  );
};

export default Login;
