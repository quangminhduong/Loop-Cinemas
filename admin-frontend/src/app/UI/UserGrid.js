import { UsersContext } from "app/pages/Users";
import { Snackbar } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { enableDisableUser } from "app/queries/user-queries";

import UserCard from "./UserCard";

const UserGrid = ({ reloadUsers }) => {
  const [snackbar, setSnackbar] = useState("");
  const context = useContext(UsersContext);

  const handleEnableDisableUser = async (user) => {
    const response = await enableDisableUser(
      Number(user.id),
      user.enabled ? false : true
    );
    if (response !== null) setSnackbar("User status updated");
    else setSnackbar("Failed to update user status. Please try again");
    reloadUsers();
  };

  return (
    <Fragment>
      <div className="w-full h-full grid grid-cols-6 grid-rows-none gap-2 overflow-y-scroll no-scrollbar">
        {context.users &&
          context.users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              enableDisableUser={() => handleEnableDisableUser(user)}
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
    </Fragment>
  );
};

export default UserGrid;
