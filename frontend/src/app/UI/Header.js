import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const Header = ({ user }) => {
  return (
    <div className="w-full pt-10 flex flex-col justify-end items-center bg-[#121212]">
      <div className="text-6xl font-extrabold font-limelight text-[#ba6dec] mt-[-16px] mb-6 pl-6 w-full max-w-[1920px]">
        <Link to="/">Loop Cinemas</Link>
      </div>
      <Navigation user={user} />
    </div>
  );
};

export default Header;
