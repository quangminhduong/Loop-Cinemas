import { Fragment, createContext } from "react";

import Header from "app/UI/Header";

import TicketAnalyticsCard from "app/UI/TicketAnalyticsCard";
import ReviewAnalyticsCard from "app/UI/ReviewAnalyticsCard";
import MovieVisitAnalyticsCard from "app/UI/MovieVisitAnalyticsCard";

export const DataAnalyticsContext = createContext();

const DataAnalytics = () => {
  return (
    <Fragment>
      <Header />
      <DataAnalyticsContext.Provider value="">
        <div className="w-full h-full bg-[#121212] flex justify-center">
          <div className="flex flex-col w-full h-fit max-h-full max-w-[1920px] overflow-y-scroll no-scrollbar text-white px-6">
            <div className="text-4xl mb-6">Application Analytics</div>
            <div className="flex flex-row items-center gap-8 mb-6">
              <div className="w-full h-full grid grid-cols-3 grid-rows-none gap-2 overflow-y-scroll no-scrollbar">
                <TicketAnalyticsCard></TicketAnalyticsCard>
                <ReviewAnalyticsCard></ReviewAnalyticsCard>
                <MovieVisitAnalyticsCard></MovieVisitAnalyticsCard>
              </div>
            </div>
          </div>
        </div>
      </DataAnalyticsContext.Provider>
    </Fragment>
  );
};
export default DataAnalytics;
