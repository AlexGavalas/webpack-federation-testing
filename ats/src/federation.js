import React, { lazy } from "react";
import ReactDOM from "react-dom";

const moduleFederationSharedScope = {
  react: {
    "16.9.0": {
      get: () => () => React,
      loaded: true,
    },
  },
  "react-dom": {
    "16.9.0": {
      get: () => () => ReactDOM,
      loaded: true,
    },
  },
};

const injectScript = ({ url }) => {
  return new Promise((resolve, reject) => {
    const scriptExists = document.querySelector(`script[src="${url}"]`);

    if (scriptExists) {
      resolve();
      return;
    }

    const element = document.createElement("script");

    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      resolve();
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      reject();
    };

    document.head.appendChild(element);
  });
};

const _Modules = new Map();

const getKey = ({ scope, module }) => `${scope}/${module}`;

const addToRegistry = ({ scope, module, Module }) => {
  const key = getKey({ scope, module });

  _Modules.set(key, Module);
};

const getFromRegistry = ({ scope, module }) => {
  const key = getKey({ scope, module });

  return _Modules.get(key);
};

export async function initModuleFederationSharedScope({
  scope,
  url,
  preloadModules = [],
}) {
  try {
    // Dynamically injects the remote entry script tag into the document
    await injectScript({ url });

    const shareScope = "default";

    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__(shareScope);

    // Get the remote container
    // Using the ModuleFederation plugin, the remote container is exposed in the window object
    const container = window[scope];

    // Initialize the container, providing the necessary shared modules
    await container.init(moduleFederationSharedScope);

    // Get all exports from the remote container and store them in a local Map
    const modulesP = preloadModules.map(async (module) => {
      const factory = await window[scope].get(module);

      const Module = factory();

      addToRegistry({ scope, module, Module });
    });

    await Promise.all(modulesP);
  } catch (e) {
    console.log("Error", e);
  }
}

export const dynamicImport = async (path) => {
  const [scope, ...rest] = path.split("/");
  const module = `./${rest.join("/")}`;

  const cachedModule = getFromRegistry({ scope, module });

  if (cachedModule) {
    return cachedModule;
  }

  const container = window[scope];

  const factory = await container.get(module);

  const Module = factory();

  addToRegistry({ scope, module, Module });

  return Module;
};

export const importModule = (path) => {
  const [scope, ...rest] = path.split("/");
  const module = `./${rest.join("/")}`;

  return getFromRegistry({ scope, module });
};

export const lazyImportComponent = (path, component = "default") => {
  const [scope, ...rest] = path.split("/");
  const module = `./${rest.join("/")}`;

  const cachedModule = getFromRegistry({ scope, module });

  if (cachedModule) {
    return cachedModule[component];
  }

  return lazy(async function lazyImport() {
    const Module = await dynamicImport(path);

    return {
      default: Module[component],
    };
  });
};
