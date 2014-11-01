exports.config = {

  //Running a standalone Selenium Server !
  seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.43.1.jar',
  seleniumPort: null,

  chromeDriver: '../node_modules/protractor/selenium/chromedriver',

  // If true, only chromedriver will be started.
  // Tests for browsers other than chrome will not run.
  chromeOnly: false,

  //Deploying to SauceLabs
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  //If Server already there
  //seleniumAddress: null,

  allScriptsTimeout: 110000,

  specs: [
    'e2e/*.spec.js',
  ],

  // For a list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  // Additionally, you may specify count, shardTestFiles, and maxInstances.
  capabilities: {
    browserName: 'chrome',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER
  },

  framework: 'jasmine',

  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  }

};
