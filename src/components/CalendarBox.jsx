import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Popup from "reactjs-popup";

export default function CalendarBox({
  data,
  handleDateSelect,
  handleUpdateEvents,
  handleDeleteEvent,
}) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      }}
      initialView="timeGridWeek"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      initialEvents={data}
      select={handleDateSelect}
      eventContent={(eventInfo) =>
        renderEventContent(eventInfo, handleDeleteEvent)
      }
      // eventClick={handleEventClick}
      // eventsSet={handleEvents}
      eventChange={handleUpdateEvents}
      /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
    />
  );
}

import { ListBulletIcon, TrashIcon } from "@heroicons/react/24/solid";

function renderEventContent(eventInfo, handleDeleteEvent) {
  const other = eventInfo.event.extendedProps;
  return (
    <div className="relative">
      <TrashIcon
        className="absolute right-5 top-1 size-4 text-white"
        onClick={() => {
          handleDeleteEvent(eventInfo);
          // eventInfo.event.remove();
        }}
      />
      <div className="absolute right-1 top-1 ">
        <Popup
          trigger={<ListBulletIcon className="size-4 text-white" />}
          position="top center"
          on={["hover", "focus"]}
        >
          <div className="bg-white shadow-sm border p-2 text-xs">
            Name: {other.name} <br />
            Email: {other.email} <br />
            Phone: {other.phone} <br />
          </div>
        </Popup>
      </div>
      <p>{eventInfo.event.title}</p>
      <small>{eventInfo.timeText}</small>
    </div>
  );
}
