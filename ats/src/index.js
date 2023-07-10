import { initModuleFederationSharedScope } from "./federation";

initModuleFederationSharedScope({
  scope: "job_editor",
  url: "http://localhost:4002/remoteEntry.js",
  preloadModules: ["./hook", "./app"],
}).then(() => {
  import("./bootstrap");
});
