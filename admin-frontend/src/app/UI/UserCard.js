import { Button } from "@mui/material";
import { FormatDate } from "app/utils/format";

const UserCard = ({ user, enableDisableUser }) => {
  return (
    <div className="w-full h-[350px] p-4 bg-[#282b2e] rounded-sm flex flex-col text-white justify-between">
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col items-center justify-center">
          <span className="material-symbols-outlined !text-8xl">
            account_circle
          </span>
          <div className="font-semibold text-2xl">{user.username}</div>
        </div>
        <div className="mt-6">
          Date joined: {FormatDate(Number(user.createdAt))}
        </div>
        <div className="mt-2">Status: {user.enabled ? "Active" : "Banned"}</div>
      </div>
      <div className="w-full flex items-center justify-end mt-4 gap-2">
        <Button
          className="w-full"
          type="button"
          variant="outlined"
          onClick={enableDisableUser}
        >
          {user.enabled ? "Disable" : "Enable"}
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
