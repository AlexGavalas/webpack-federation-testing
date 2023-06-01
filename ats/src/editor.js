import React, { Suspense, lazy } from "react";
import { importRemote, injectScript } from "@module-federation/utilities";

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

export default (props) => (
  <Suspense fallback={<span>loading</span>}>
    <RemoteApp {...props} />
  </Suspense>
);
