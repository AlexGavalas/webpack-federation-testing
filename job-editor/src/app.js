import React from "react";

const App = ({ onClick }) => {
  const onClickHandler = () => {
    onClick?.();
  };

  return (
    <div>
      <div
        style={{
          margin: "10px",
          padding: "10px",
          textAlign: "center",
          backgroundColor: "greenyellow",
        }}
      >
        <h1>Job Editor</h1>
        <button onClick={onClickHandler}>Click here</button>
      </div>
    </div>
  );
};

export default App;
