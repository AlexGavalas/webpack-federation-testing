import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.render(
  <App onClick={() => console.log("Clicked")} />,
  document.getElementById("root")
);
