[![Build Status](https://travis-ci.org/Apercu/ng-markdown.svg?branch=master&style=flat-square)](https://travis-ci.org/Apercu/ng-markdown) [![protractor](http://img.shields.io/badge/protractor-passing-green.svg?style=flat-square)](https://saucelabs.com/u/Apercu) [![Coverage Status](https://img.shields.io/coveralls/Apercu/ng-markdown.svg?style=flat-square)](https://coveralls.io/r/Apercu/ng-markdown) [![devDependency Status](https://david-dm.org/Apercu/ng-markdown/dev-status.svg?style=flat-square)](https://david-dm.org/Apercu/ng-markdown#info=devDependencies)

NgMarkdown
========

This module allows you to create a ready-to-use editor based on markdown syntax.

Simply include the dist files, inject the `ngMarkdown` dependency in your app and add in your template:

    <div class="wmd-button-bar"></div>
    <ng-markdown ng-model="markdownText"></ng-markdown>
    <div class="wmd-preview"></div>

You can also convert directly from a controller by using the `get` method of the `ngMarkdown` service

    console.log(ngMarkdown.get('**strong**'));

There is also a filter

    {{ markdownText | ngMarkdown  }}

And a brand-new preview directive

    <ng-markdown-preview ng-model="markdownText"></ng-markdown-preview>

Complete demos and documentation at [this address](http://apercu.github.io/ng-markdown/).

#Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

# Syntax Highlight

Using [highlight.js](http://highlightjs.org/).
The currently supported languages are : Apache, Bash, C#, C++, CSS, CoffeeScript, Diff, HTML, XML, HTTP, Ini, JSON, Java, JavaScript, Makefile, Markdown, Nginx, Objective C, PHP, Perl, Python, Ruby, SQL, LUA, Delphi, ActionScript, Clojure, Django, Go, Haskell, Lisp, SCSS and Vim Script.
If you want support for another language, PM me or open an issue.

#Changelog

See [CHANGELOG.md](./CHANGELOG.md).
