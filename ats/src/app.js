import React, { Suspense } from "react";
import PropTypes from "prop-types";
import Editor from "./editor";

const App = ({ onClick }) => {
  return (
    <div>
      <div
        style={{
          margin: "10px",
          padding: "10px",
          textAlign: "center",
          backgroundColor: "rebeccapurple",
        }}
      >
        <h1>ATS</h1>
      </div>
      <Suspense fallback={<span>loading</span>}>
        <Editor onClick={onClick} />
      </Suspense>
    </div>
  );
};

App.propTypes = {
  onClick: PropTypes.func,
};

export default App;
