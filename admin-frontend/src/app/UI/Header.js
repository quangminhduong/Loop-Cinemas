import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("login");
    navigate("/login");
  };

  return (
    <div className="w-full pt-10 flex flex-col justify-end items-center bg-[#121212]">
      <div className="text-6xl font-extrabold font-limelight text-[#d43d3d] mt-[-16px] mb-6 px-6 w-full max-w-[1920px] flex flex-row items-center justify-between">
        <Link to="/dashboard" className="flex flex-row items-end">
          <div>Loop Cinemas |</div>
          <div className="text-2xl ml-4">Admin</div>
        </Link>
        <Button variant="outlined" type="button" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
