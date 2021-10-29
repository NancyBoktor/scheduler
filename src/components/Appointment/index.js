import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
// import Confirm from "./Confirm";
// import Status from "./Status";
// import Error from "./Error";
import classNames from "classnames";

export default function Appointment(props) {
  const classes = classNames("appointment", {
    "appointment:last-of-type__add__card": props.time >= "5pm",
  });
  return (
    <article className={classes}>
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      ) : (
        <Empty time={props.time} />
      )}
    </article>
  );
}
