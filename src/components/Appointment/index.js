import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import classNames from "classnames";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVEING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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

  //   -------- Save ----------
  const save = (name, interviewer) => {
    if (!interviewer) {
      return transition(ERROR_SAVE);
    }
    const newInterview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, newInterview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        if (err) {
          transition(ERROR_SAVE, true);
        }
      });
  };

  //   -------- Delete ----------
  const deleteAppointment = () => {
    transition(CONFIRM);
  };
  const confirmDeleting = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        if (err) {
          transition(ERROR_DELETE, true);
        }
      });
  };

  //   -------- Edit ----------
  const editAppointment = () => {
    transition(EDIT);
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
          onDelete={deleteAppointment}
          onEdit={editAppointment}
        />
      )}
      {mode === SAVING && <Status message={"SAVING"} />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete the appointment?"
          onCancel={onCancel}
          onConfirm={confirmDeleting}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={onCancel} />
      )}
    </article>
  );
}
