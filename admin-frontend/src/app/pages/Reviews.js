import { getAllMovies } from "app/queries/movie-queries";
import { getAllReviews } from "app/queries/review-queries";
import { Fragment, createContext, useEffect, useState } from "react";

import Header from "app/UI/Header";
import ReviewGrid from "app/UI/ReviewGrid";

export const ReviewsContext = createContext();

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getPageData();
  }, []);

  const getPageData = async () => {
    const allReviews = await getAllReviews();
    const allMovies = await getAllMovies();
    setReviews(allReviews);
    setMovies(allMovies);
  };

  return (
    <Fragment>
      <Header />
      <ReviewsContext.Provider value={{ reviews, movies }}>
        <div className="w-full h-full bg-[#121212] flex justify-center">
          <div className="flex flex-col w-full h-fit max-h-full max-w-[1920px] overflow-y-scroll no-scrollbar text-white px-6">
            <div className="text-4xl mb-6">All Reviews</div>
            <ReviewGrid reloadReviews={getPageData} />
          </div>
        </div>
      </ReviewsContext.Provider>
    </Fragment>
  );
};

export default Reviews;
