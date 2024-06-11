import DashboardColumnItem from "./DashboardColumnItem";

const DashboardColumn = ({ items, itemType, viewAll, title }) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 rounded-sm bg-[#282b2e] p-6 overflow-y-scroll no-scrollbar">
      <div className="w-full flex flex-row items-end justify-between text-white ">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="cursor-pointer text-base underline" onClick={viewAll}>
          View More Info
        </div>
      </div>
      {items &&
        items.map((item) => (
          <DashboardColumnItem key={item.id} item={item} type={itemType} />
        ))}
    </div>
  );
};

export default DashboardColumn;
