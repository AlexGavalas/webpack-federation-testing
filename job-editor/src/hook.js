import React, { useState } from "react";

export const useJob = () => {
  const [job, setJob] = useState({ id: 42 });

  return {
    job,
    setJob,
  };
};

export const WithJob = (Component) => {
  const Wrapper = (props) => {
    const { job, setJob } = useJob();

    return <Component {...props} job={job} setJob={setJob} />;
  };

  return Wrapper;
};

export const doSomething = () => {
  console.log("I did something");
};

export default WithJob;
