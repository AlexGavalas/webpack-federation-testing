import React, { Suspense, lazy } from "react";
import { importRemote, injectScript } from "@module-federation/utilities";

// const dynamicContainer = injectScript({
//   global: "app2",
//   url: `http://localhost:3002/remoteEntry.js`,
// }).then((container) => {
//   return container.get("./app").then((factory) => {
//     return factory();
//   });
// });

const RemoteApp = lazy(
  // () => import("app2/app")
  // () => dynamicContainer
  () =>
    importRemote({
      url: "http://localhost:3002",
      bustRemoteEntryCache: false,
      scope: "app2",
      module: "app",
    })
);

export default (props) => (
  <Suspense fallback={<span>loading</span>}>
    <RemoteApp {...props} />
  </Suspense>
);
