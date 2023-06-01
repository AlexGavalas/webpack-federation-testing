import React, { Suspense, lazy } from "react";
import { importRemote } from "@module-federation/utilities";

// import { injectScript } from "@module-federation/utilities";
// const dynamicContainer = injectScript({
//   global: "job_editor",
//   url: `http://localhost:3002/remoteEntry.js`,
// }).then((container) => {
//   return container.get("./app").then((factory) => {
//     return factory();
//   });
// });

const RemoteApp = lazy(
  // () => import("job_editor/app")
  // () => dynamicContainer
  () =>
    importRemote({
      url: "http://localhost:3002",
      bustRemoteEntryCache: false,
      scope: "job_editor",
      module: "app",
    })
);

const Editor = (props) => (
  <Suspense fallback={<span>loading</span>}>
    <RemoteApp {...props} />
  </Suspense>
);

export default Editor;
