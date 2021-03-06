import React from "react";
import PropTypes from "prop-types";

export default function Status(Props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{Props.message}</h1>
    </main>
  );
}

Status.propTypes = {
  message: PropTypes.string.isRequired,
};
