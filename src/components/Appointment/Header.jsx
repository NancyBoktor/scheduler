import React from "react";

export default function Header(Props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{Props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}
