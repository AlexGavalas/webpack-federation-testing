import React, { Suspense, useState } from "react";
import PropTypes from "prop-types";
import Editor from "./editor";
import { importModule, dynamicImport, lazyImportComponent } from "./federation";
import "./app.css";

const { useJob } = importModule("job_editor/hook");
const LazyDemo = lazyImportComponent("job_editor/lazy", "LazyDemo");

const App = ({ onClick }) => {
  const [count, setCount] = useState(0);
  const { job } = useJob();

  const handleClick = async () => {
    const { doSomething } = await dynamicImport("job_editor/lazy-helper");

    doSomething();
    onClick();

    setCount((c) => c + 1);
  };

  const showLazy = count % 2 !== 0;

  return (
    <>
      <div className="container">
        <h1>ATS</h1>
        <h2>ID: {job.id}</h2>
      </div>
      <Suspense fallback={"Loading ..."}>
        <Editor onClick={handleClick} />
      </Suspense>
      <Suspense fallback={"Loading ..."}>{showLazy && <LazyDemo />}</Suspense>
    </>
  );
};

App.propTypes = {
  onClick: PropTypes.func,
};

export default App;
