import { useState } from "react";
import { TextField, Button, ThemeProvider } from "@mui/material";
import { MuiTheme } from "app/utils/mui-theme";
import { FormatDate } from "app/utils/format";

import sha256 from "js-sha256";
import Card from "app/UI/Card";

const ProfileCard = ({ activeUser, updateUser, deleteUser }) => {
  const [username, setUsername] = useState(activeUser.username);
  const [email, setEmail] = useState(activeUser.email);
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [editing, setEditing] = useState(false);

  const handleOpenCloseForm = (status) => {
    setEditing(status);
    resetForm();
  };

  const resetForm = () => {
    setUsername(activeUser.username);
    setEmail(activeUser.email);
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
  };

  const handleEditProfile = async () => {
    // Validate email format
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    setPasswordError("");
    if (password && password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    updateUser({
      username: username,
      email: email,
      password: password.length > 0 ? sha256(password) : activeUser.password,
    }); // Update the user in local state
    setEditing(false);
    resetForm();
  };

  return (
    <Card className="!bg-[#282b2e] !w-[400px] !h-fit !p-4">
      {editing ? (
        <form>
          <ThemeProvider theme={MuiTheme}>
            <div className="mb-4">
              <TextField
                label="Username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                variant="outlined"
                fullWidth
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                error={usernameError !== ""}
                helperText={usernameError}
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                variant="outlined"
                fullWidth
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                error={emailError !== ""}
                helperText={emailError}
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Password"
                type="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                required
                variant="outlined"
                fullWidth
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                error={passwordError !== ""}
                helperText={passwordError}
              />
            </div>
            <div className="flex justify-end gap-4 !mt-8">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleOpenCloseForm(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditProfile}
              >
                Save
              </Button>
            </div>
          </ThemeProvider>
        </form>
      ) : (
        <div>
          <h1 className="text-xl font-semibold mb-3">
            Username: {activeUser.username}
          </h1>
          <p className="text-gray-400 mb-2">Email: {activeUser.email}</p>
          <p className="text-gray-400">
            Date Joined: {FormatDate(activeUser.createdAt)}
          </p>
          <p className="text-gray-400 mt-2 mb-4">Password: ********</p>
          <div className="flex justify-end gap-4 !mt-8">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleOpenCloseForm(true);
              }}
              className="mr-2"
            >
              Edit Profile
            </Button>
            <Button variant="contained" color="secondary" onClick={deleteUser}>
              Delete Profile
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProfileCard;
