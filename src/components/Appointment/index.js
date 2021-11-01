import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import classNames from "classnames";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVEING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //console.log({ props });

  const classes = classNames("appointment", {
    "appointment:last-of-type__add__card": props.time >= "5pm",
  });

  const onAdd = () => {
    transition(CREATE);
  };
  const onCancel = () => {
    back();
  };

  const save = (name, interviewer) => {
    const newInterview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, newInterview).then(() => {
      transition(SHOW);
    });
  };

  return (
    <article className={classes}>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === SAVING && <Status message={"SAVING"} />}
    </article>
  );
}
