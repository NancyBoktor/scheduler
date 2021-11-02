import React from "react";
import { render } from "@testing-library/react";
import Appointment from "components/Appointment";

//--------> Testing <---------//
describe("Appointment", () => {
  test("renders without crashing", () => {
    render(<Appointment />);
  });
});
