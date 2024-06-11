import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Movie from "./pages/Movie";

const App = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col">
      <Router className="h-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
