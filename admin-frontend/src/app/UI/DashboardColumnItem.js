import { FormatDate } from "app/utils/format";

const DashboardColumnItem = ({ item, type }) => {
  return (
    <div className="w-full h-fit text-white bg-[#1f2022] rounded-sm p-4">
      {/* User Item */}
      {type === "user" && (
        <div className="flex flex-row items-center">
          <span className="material-symbols-outlined mr-6 !text-5xl">
            account_circle
          </span>
          <div className="flex flex-col flex-grow">
            <div className="font-semibold text-2xl">{item.username}</div>
            <div className="mb-2">
              Date joined: {FormatDate(Number(item.createdAt))}
            </div>
            <div>Status: {item.enabled ? "Active" : "Banned"}</div>
          </div>
        </div>
      )}

      {/* Review Item */}
      {type === "review" && (
        <div className="flex flex-col">
          <div className="font-semibold text-2xl">{item.username}</div>
          <div>Rating: {item.rating}/5</div>
          <div className="mb-2">
            Status: {item.hidden ? "Hidden" : "Not hidden"}
          </div>
          <div className="line-clamp-3">{item.message}</div>
        </div>
      )}

      {/* Movie Item */}
      {type === "movie" && (
        <div className="flex flex-row gap-4">
          <img
            className="w-[120px] h-[175px]"
            src={item.poster}
            alt="movie-poster"
          />
          <div className="flex flex-col">
            <div className="font-semibold text-2xl">{item.title}</div>
            <div className="font-semibold mb-2">Director: {item.director}</div>
            <div className="">Runtime: {item.runtime} minutes</div>
            <div className="">
              Release Date: {FormatDate(Number(item.release_date))}
            </div>
          </div>
        </div>
      )}
      {/* Data Analytics */}
      {type === "data-analytics" && (
        <div className="flex flex-col border-[1px] border-white rounded-sm py-2 px-4">
          <div className="font-semibold"></div>
        </div>
      )}
    </div>
  );
};

export default DashboardColumnItem;
