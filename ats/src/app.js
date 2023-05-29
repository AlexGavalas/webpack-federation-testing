import React, { Suspense } from "react";
const RemoteApp = React.lazy(() => import("app2/app"));

const App = () => {
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
      <Suspense fallback={"loading..."}>
        <RemoteApp />
      </Suspense>
    </div>
  );
};

export default App;
