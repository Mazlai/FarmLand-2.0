// Karma configuration
// Used to define custom browser launchers for CI environments.
// The Angular CLI (@angular/build:karma) merges this file with its own defaults.
module.exports = function (config) {
  config.set({
    customLaunchers: {
      // Chrome headless without sandbox — required in GitHub Actions (non-root containers)
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu'],
      },
    },
  });
};
