import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "app/queries/user-queries";
import { getAllMovies } from "app/queries/movie-queries";
import { getAllReviews } from "app/queries/review-queries";

import Header from "app/UI/Header";
import DashboardColumn from "app/UI/DashboardColumn";

const Dashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Check to see if there is login data
    const loginData = sessionStorage.getItem("login");
    if (!loginData) navigate("/login");

    getPageData();
  }, [navigate]);

  const getPageData = async () => {
    const allUsers = await getAllUsers();
    const allMovies = await getAllMovies();
    const allReviews = await getAllReviews();
    setUsers(allUsers);
    setMovies(allMovies);
    setReviews(allReviews);
  };

  return (
    <Fragment>
      <Header />
      <div className="w-full h-full flex items-center justify-center relative bg-[#121212] overflow-y-hidden">
        <div className="w-full h-full grid grid-cols-3 grid-rows-6 gap-4 max-w-[1920px] px-6 pb-6">
          <div className="col-span-1 row-span-6 overflow-y-scroll no-scrollbar">
            <DashboardColumn
              items={users}
              itemType="user"
              title="Users"
              viewAll={() => {
                navigate("/users");
              }}
            />
          </div>
          <div className="col-span-1 row-span-5 row-start-1 col-start-2 overflow-y-scroll no-scrollbar">
            <DashboardColumn
              items={movies}
              itemType="movie"
              title="Movies"
              viewAll={() => navigate("/movies")}
            />
          </div>
          <div className="col-span-1 row-span-1 row-start-6 col-start-2 overflow-y-scroll no-scrollbar">
            <DashboardColumn
              itemType="data-analytics"
              title="Data Analytics"
              viewAll={() => {
                navigate("/data-analytics");
              }}
            />
          </div>
          <div className="col-span-1 row-span-6 col-start-3 row-start-1 overflow-y-scroll no-scrollbar">
            <DashboardColumn
              items={reviews}
              itemType="review"
              title="Reviews"
              viewAll={() => {
                navigate("/reviews");
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
