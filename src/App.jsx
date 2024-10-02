import { useState } from "react";
import ActionForm from "./components/ActionForm";
import CalendarBox from "./components/CalendarBox";
import ViewDetail from "./components/ViewDetail";
import useAppointment from "./hooks/useAppointment";

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
  } = useAppointment();
  const closeSummary = () => {
    setViewDetail(false);
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div className="container mx-auto">
      <button onClick={() => setViewDetail(true)}>View Summary</button>
      <CalendarBox
        data={data}
        deleteAppotintMent={deleteAppotintMent}
        handleDateSelect={popActionForm}
        handleUpdateEvents={handleUpdateEvents}
        handleDeleteEvent={handleDeleteEvent}
      />
      {showAction && <ActionForm addAppointment={addAppointment} />}
      {viewDetail && <ViewDetail data={data} closeSummary={closeSummary} />}
    </div>
  );
}

export default App;
