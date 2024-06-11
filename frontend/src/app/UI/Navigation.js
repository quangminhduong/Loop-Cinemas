import { useNavigate, Link } from "react-router-dom";

const Navigation = ({ user }) => {
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (user) localStorage.removeItem("activeUser");
    navigate("/login");
  };

  return (
    <div className="w-full bg-[#282b2e] flex items-center justify-center">
      <div className="w-full max-w-[1920px] flex flex-row justify-between items-center px-6">
        <div className="flex items-center gap-4 text-white text-2xl">
          <Link to="/" className="pl-2 group transition-colors">
            <h1>Home</h1>
          </Link>
          {user && (
            <Link
              to="/profile"
              className="group transition-colors border-l-[2px] border-l-white pl-4"
            >
              <h1>Profile</h1>
            </Link>
          )}
        </div>
        <div className="flex gap-4 m-4">
          {user && (
            <div className="text-white text-2xl mr-8">
              <h1>Welcome, {user.username}</h1>
            </div>
          )}
          <div
            className="text-white text-2xl cursor-pointer"
            onClick={handleLoginLogout}
          >
            {user ? "Logout" : "Login / Register"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
