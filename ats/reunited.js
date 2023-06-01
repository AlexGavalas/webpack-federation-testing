module.exports = (url, scope) => {
  return `promise new Promise(resolve => {
    // const urlParams = new URLSearchParams(window.location.search)
    // const version = urlParams.get('app1VersionParam')
    // This part depends on how you plan on hosting and versioning your federated modules
    // const remoteUrlWithVersion = 'http://localhost:3001/' + version + '/remoteEntry.js'

    const remoteUrlWithVersion = "${url}"
    
    const script = document.createElement('script')
    script.src = remoteUrlWithVersion
    script.onload = () => {
      // the injected script has loaded and is available on window we can now resolve this Promise
     
      const proxy = {
        get: (request) => window.${scope}.get(request),
        init: (arg) => {
          try {
            return window.${scope}.init(arg)
          } catch(e) {
            console.log('remote container already initialized')
          }
        }
      }
      
      resolve(proxy)
    }
    
    // inject this script with the src set to the versioned remoteEntry.js
    document.body.appendChild(script);
  })
`;
};
