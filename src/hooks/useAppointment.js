"use client";
import { useState, useEffect } from "react";
import { axiosFireApi } from "../lib/api";

const useAppointment = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAction, setShowAction] = useState(null);

  const popActionForm = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    setShowAction(selectInfo);
  };

  const addAppointment = async (formData) => {
    let calendarApi = showAction.view.calendar;
    const sendData = {
      ...formData,
      start: showAction.start,
      end: showAction.end,
    };
    const response = await axiosFireApi("appointment", "post", sendData);
    if (response.success) {
      const calData = convertToCalFormat(response.data.data);
      setData([...data, calData]);
      calendarApi.addEvent(convertToCalFormat(calData));
      setShowAction(null);
      return false;
    } else {
      return response.error.errors;
    }
  };

  const deleteAppotintMent = async (id) => {
    await axiosFireApi(["appointment", id], "delete");
  };

  const convertToFormat = (date) => {
    const finalData = date.data.map((item) => convertToCalFormat(item));
    return finalData;
  };
  const convertToCalFormat = (item) => {
    return {
      id: item._id,
      title: item.title,
      start: item.start,
      end: item.end,
      extendedProps: {
        name: item.name,
        email: item.email,
        phone: item.phone,
        notes: item.notes,
      },
    };
  };

  const fireApi = async () => {
    setLoading(true);
    const response = await axiosFireApi("appointment");
    if (response.success) {
      let resData = convertToFormat(response.data);
      setData(resData);
      setLoading(false);
    } else {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  const handleUpdateEvents = async (events) => {
    const start = events.event.startStr;
    const end = events.event.endStr;
    const id = events.event.id;

    const sendData = {
      start: start,
      end: end,
    };
    const response = await axiosFireApi(["appointment", id], "patch", sendData);
    console.log(response);
    // console.log("start", start, end, events.event.id);
  };

  const handleDeleteEvent = (eventInfo) => {
    const id = eventInfo.event.id;
    if (
      confirm(
        `Are you sure you want to delete the event '${eventInfo.event.title}'`
      )
    ) {
      eventInfo.event.remove();
      axiosFireApi(["appointment", id], "delete");
    }
  };

  useEffect(() => {
    fireApi();
  }, []);

  return {
    data,
    loading,
    error,
    addAppointment,
    deleteAppotintMent,
    showAction,
    popActionForm,
    handleUpdateEvents,
    handleDeleteEvent,
  };
};

export default useAppointment;
