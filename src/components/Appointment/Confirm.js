import React from "react";
import Button from "components/Button";
export default function Confirm(Props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{Props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={Props.onCancel}>
          Cancel
        </Button>
        <Button danger onClick={Props.onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
