import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders", () => {
    render(<Button>Click me!</Button>);
    expect(screen.queryByText("Click me!")).toBeTruthy();
  });
});
