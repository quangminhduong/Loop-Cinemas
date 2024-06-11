import { useRef, useState } from "react";
import { TextField, Button, Snackbar, ThemeProvider } from "@mui/material";
import { MuiTheme } from "app/utils/mui-theme";
import { useNavigate } from "react-router-dom";
import { login } from "app/queries/user-queries";

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

    const response = await login(email, sha256(password));
    if (response === null) {
      setEmailError("Incorrect username or password");
      setPasswordError("Incorrect username or password");
      return;
    }
    sessionStorage.setItem("login", true);
    setSnackbar(true);
  };

  return (
    <div className="w-full bg-[url('app/assets/blob-background.svg')] h-full flex flex-col items-end justify-center bg-cover text-white">
      <div className="absolute top-6 left-6 text-[#ba6dec] font-limelight flex gap-4 items-end">
        <h1 className="text-6xl font-extrabold">Loop Cinemas |</h1>
        <h3 className="text-2xl">Admin</h3>
      </div>
      <Card className="w-[500px] mr-16 ml-16 !bg-[#282b2e]">
        <form className="flex flex-col gap-4">
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
            ></TextField>
          </ThemeProvider>
          <div className="flex flex-row justify-between items-center mt-2">
            <Button
              variant="contained"
              size="large"
              type="button"
              color="secondary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
      <Snackbar
        open={snackbar}
        autoHideDuration={2500}
        onClose={() => navigate("/dashboard")}
        message="Login successful!"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </div>
  );
};

export default Login;
