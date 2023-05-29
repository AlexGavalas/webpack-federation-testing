import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./app";

describe("App", () => {
  it("renders", () => {
    render(<App />);
    expect(screen.queryByText("Job Editor")).toBeTruthy();
  });
});
