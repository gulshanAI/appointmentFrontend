import { XMarkIcon } from "@heroicons/react/24/solid";
import { getReadableDateAndTime } from "../lib/helper";

const List = ({ item }) => {
  const { extendedProps, title, start, end } = item;
  const { date, time } = getReadableDateAndTime(start);
  return (
    <div className="grid grid-cols-3 divide-x bg-gray-100 px-6 py-1 rounded-md cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="flex flex-col">
        <span className="text-xl">{date}</span>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <div className="pl-2 text-sm text-center">
        <p>{extendedProps?.name}</p>
        <p>{extendedProps?.email}</p>
      </div>
      <p className="text-gray-600 text-sm pl-2 text-center">{title}</p>
    </div>
  );
};

const ViewDetail = ({ data, closeSummary }) => {
  if (!data) return null;
  return (
    <div>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={closeSummary}
      />
      <div className="fixed right-0 top-0 h-full bg-white p-4 z-50 w-1/2">
        <XMarkIcon
          className="absolute top-2 right-2 size-5 cursor-pointer hover:text-indigo-700"
          onClick={closeSummary}
        />
        <div className="flex justify-between items-center border-b pb-2 mt-2">
          <h5 className="text-xl font-bold mb-4 text-indigo-600">Summary </h5>
          <p>Total Appointment: {data.length}</p>
        </div>
        <div className="overflow-auto h-full pb-24 pt-8 flex flex-col gap-y-3">
          {data.map((item) => (
            <List key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
