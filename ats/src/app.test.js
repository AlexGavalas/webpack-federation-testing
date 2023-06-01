import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("App", () => {
  beforeEach(async () => {
    // Currently uses --forceExit due to the following issues:
    // https://github.com/jsdom/jsdom/issues/2448
    // https://github.com/facebook/react/issues/26608
    window.MessageChannel = require("worker_threads").MessageChannel;

    // TODO: Investigate better way
    // We have to inject the script before the remote module is imported
    const script = document.createElement("script");
    script.src = "http://localhost:3002/remoteEntry.js";

    const promise = new Promise((resolve) => {
      script.onload = async () => {
        resolve();
      };
    });

    document.head.appendChild(script);

    await promise;
  });

  afterEach(() => {
    // jest.resetModules();
    // jest.resetAllMocks();
  });

  it("renders the federated module", async () => {
    const App = (await import("./app")).default;

    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByText("Job Editor")).toBeTruthy();
  });

  describe("when the federated module is mocked", () => {
    it.todo("uses the mocked federated module");
  });
});
