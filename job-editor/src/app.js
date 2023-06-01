import React from "react";
import PropTypes from "prop-types";

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

App.propTypes = {
  onClick: PropTypes.func,
};

export default App;
