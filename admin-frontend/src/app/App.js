import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";
import Movies from "./pages/Movies";
import DataAnalytics from "./pages/DataAnalytics";

function App() {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col">
      <Router className="h-full">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/users" element={<Users />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/data-analytics" element={<DataAnalytics />} />
          <Route index element={<Navigate to="/dashboard" />} />
          <Route index element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
