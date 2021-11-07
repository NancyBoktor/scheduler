import React, { useState } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  /*--------->Updating The Spots <--------*/
  function updateSpots(newAppointments) {
    const newState = { ...state };
    return newState.days.map((eachDay) => {
      let freeSpots = 0;
      for (const key of eachDay.appointments) {
        if (!newAppointments[key].interview) freeSpots++;
      }
      return { ...eachDay, spots: freeSpots };
    });
  }

  /*--------->Making New Appointment <--------*/
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const addingSpot = (id) => {
      setState(...state.days[id]);
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({
        ...state,
        appointments,
        days: updateSpots(appointments),
      });
    });
  };

  /*--------->Cancel an Appointment <--------*/
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = { ...state.appointments, [id]: appointment };
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
        days: updateSpots(appointments),
      });
    });
  };
  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview,
    isLoading,
    setIsLoading,
  };
};

export default useApplicationData;
