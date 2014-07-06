exports.config = {

	//Running a standalone Selenium Server !
	seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',
	seleniumPort: null,

	chromeDriver: '../node_modules/protractor/selenium/chromedriver',

	// If true, only chromedriver will be started.
	// Tests for browsers other than chrome will not run.
	chromeOnly: false,

	//Deploying to SauceLabs (warn with the key ?)
	//sauceUser: 'bgronon',
	//sauceKey: '',

	//If Server already there
	//seleniumAddress: null,

	allScriptsTimeout: 11000,

	specs: [
		'e2e/*.js',
	],

	// For a list of available capabilities, see
	// https://code.google.com/p/selenium/wiki/DesiredCapabilities
	// and
	// https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
	// Additionally, you may specify count, shardTestFiles, and maxInstances.
	capabilities: {
		browserName: 'chrome',
	},

	framework: 'jasmine',

	jasmineNodeOpts: {
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 30000
	}

};
