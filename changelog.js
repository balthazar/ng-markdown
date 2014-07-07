#!/usr/bin/env node

var pkg = require('./package.json');
var fs = require('fs');
var changelog = require('conventional-changelog');

changelog({
	version: pkg.version,
	repository: 'https://github.com/Apercu/ng-markdown',
	from: '2.0.0'
}, function(err, log) {
	if (err) throw new Error(err);
	fs.writeFileSync('CHANGELOG.md', log);
});

