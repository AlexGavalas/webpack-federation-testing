module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    resources: "usable",
    runScripts: "dangerously",
  },
  testPathIgnorePatterns: ["/node_modules/"],
};
