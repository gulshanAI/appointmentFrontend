import { useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

export default function CalendarBox({
  data,
  handleDateSelect,
  handleUpdateEvents,
  handleDeleteEvent,
}) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  // function handleWeekendsToggle() {
  //   setWeekendsVisible(!weekendsVisible);
  // }

  // function handleDateSelect(selectInfo) {
  //   let title = prompt("Please enter a new title for your event");
  //   let calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect(); // clear date selection
  //   console.log("selectInfo", selectInfo);
  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //     });
  //   }
  // }

  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }
  return (
    <div className="demo-app">
      {/* <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
      /> */}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
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
          } // custom render function
          // eventClick={handleEventClick}
          eventsSet={handleEvents}
          eventChange={handleUpdateEvents}
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
  );
}

import { ListBulletIcon, TrashIcon } from "@heroicons/react/24/solid";

function renderEventContent(eventInfo, handleDeleteEvent) {
  return (
    <div className="relative">
      {/* <div className="group">
        <ListBulletIcon className="size-4 text-white" />
        <ul className="absolute right-0 top-0">
          <li>Start: {eventInfo.event.startStr}</li>
        </ul>
      </div> */}
      <p>{eventInfo.event.title}</p>
      <small>{eventInfo.timeText}</small>
      <TrashIcon
        className="size-4 text-red-500"
        onClick={() => {
          handleDeleteEvent(eventInfo);
          // eventInfo.event.remove();
        }}
      />
    </div>
  );
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className="demo-app-sidebar hidden">
      <div className="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          toggle weekends
        </label>
      </div>
      <div className="demo-app-sidebar-section">
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
