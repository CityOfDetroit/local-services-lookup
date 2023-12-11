const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 100000,
  projectId: 'local-services-lookup',
  pageLoadTimeout: 100000,
  video: false,
  videoUploadOnPasses: false,
  includeShadowDom: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
