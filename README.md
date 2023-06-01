# Webpack Module Federation Testing

A playground to evaluate and play around with ways to test applications that use federated modules.

Here `ats` is the host application and `job-editor` is the remote.

In the end we should have the flexibility to:

- Use the real federated module as is from the remote (eg. import a specific version of the remote).
- Mock the federated module.
