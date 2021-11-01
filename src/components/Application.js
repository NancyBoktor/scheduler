/* -----------> Import <------------*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

/* -----------> App function <------------*/
export default function Application(props) {
  const [isLoading, setIsLoading] = useState(true);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      1: {
        id: 1,
        time: "12pm",
        interview: null,
      },
    },
    interviewers: {},
  });

  /*--------->Making New Appointment <--------*/
  const bookInterview = (id, interview) => {
    // console.log("Id", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({
        ...state,
        appointments,
      });
      // console.log("resAxios", res);
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
      });
      // console.log("resAxios", res);
    });
  };

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const scadule = dailyAppointments.map((app) => {
    const interview = getInterview(state, app.interview);
    return (
      <Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  //console.log("daily", dailyAppointments);

  const setDay = (day) => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }))

  useEffect(() => {
    axios
      .all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers"),
      ])

      .then((resArr) => {
        // console.log("res", resArr);
        setIsLoading(false);
        // setState((state.days = resArr[0].data));
        // setState((state.appointments = resArr[1].data));
        setState((prevState) => ({
          ...prevState,
          days: resArr[0].data,
          appointments: resArr[1].data,
          interviewers: resArr[2].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);
  //console.log("state", state.days, state.appointments);
  if (isLoading) {
    return (
      <section>
        <p>Loading....</p>
      </section>
    );
  }
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />

        <hr className="sidebar__separator sidebar--centered" />

        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>

      <section className="schedule">
        {scadule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
