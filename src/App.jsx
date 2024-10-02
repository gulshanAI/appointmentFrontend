import { useState } from "react";
import CalendarBox from "./components/CalendarBox";
import useAppointment from "./hooks/useAppointment";
import { lazy, Suspense } from "react";

const ViewDetail = lazy(() => import("./components/ViewDetail"));
const ActionForm = lazy(() => import("./components/ActionForm"));

function App() {
  const [viewDetail, setViewDetail] = useState(false);
  const {
    data,
    loading,
    error,
    addAppointment,
    deleteAppotintMent,
    popActionForm,
    showAction,
    handleUpdateEvents,
    handleDeleteEvent,
    closePopAction,
  } = useAppointment();
  const closeSummary = () => {
    setViewDetail(false);
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div className="container mx-auto py-4">
      <div
        className="p-4 mb-4 text-sm text-indigo-800 rounded-lg bg-indigo-50 flex justify-between"
        role="alert"
      >
        <div>
          <span className="font-medium">View full Summary</span> <br />
          <span className="font-light">
            You can view the full summary of all appointments
          </span>
        </div>
        <button
          onClick={() => setViewDetail(true)}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          View Summary
        </button>
      </div>
      <CalendarBox
        data={data}
        deleteAppotintMent={deleteAppotintMent}
        handleDateSelect={popActionForm}
        handleUpdateEvents={handleUpdateEvents}
        handleDeleteEvent={handleDeleteEvent}
      />
      {showAction && (
        <Suspense>
          <ActionForm
            addAppointment={addAppointment}
            closePopAction={closePopAction}
          />
        </Suspense>
      )}
      {viewDetail && (
        <Suspense>
          <ViewDetail data={data} closeSummary={closeSummary} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
