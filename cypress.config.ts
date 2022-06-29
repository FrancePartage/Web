import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
		baseUrl: 'http://francepartage.zapto.org/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
