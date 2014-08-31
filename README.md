NgMarkdown [![Build Status](https://travis-ci.org/Apercu/ng-markdown.svg?branch=master)](https://travis-ci.org/Apercu/ng-markdown) [![Coverage Status](https://img.shields.io/coveralls/Apercu/ng-markdown.svg)](https://coveralls.io/r/Apercu/ng-markdown) [![Dev Dependencies](https://david-dm.org/Apercu/ng-markdown/dev-status.svg)](https://david-dm.org/Apercu/ng-markdown#info=devDependencies)
========

Demo and documentation at [this address](http://apercu.github.io/ng-markdown/).

#Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

# Syntax Highlight

Using [highlight.js](http://highlightjs.org/).
The currently supported languages are : Apache, Bash, C#, C++, CSS, CoffeeScript, Diff, HTML, XML, HTTP, Ini, JSON, Java, JavaScript, Makefile, Markdown, Nginx, Objective C, PHP, Perl, Python, Ruby, SQL, LUA, Delphi, ActionScript, Clojure, Django, Go, Haskell, Lisp, SCSS and Vim Script.
If you want support for another language, PM me or open an issue.

#Changelog


## 2.3.0 (2014-09-01)


#### Bug Fixes

* **core:**
  * allow to use editor hooks correclty and improve code style ([e9cc906f](https://github.com/Apercu/ng-markdown/commit/e9cc906f2c8e0d234150807585bba47b334d27e4))
* **test:** unit tests are now really operational. ([cd5d3d7e](https://github.com/Apercu/ng-markdown/commit/cd5d3d7ed473dd5a46487551b7d635a161af0c07), closes [#15](https://github.com/Apercu/ng-markdown/issues/15))


## 2.2.0 (2014-08-03)


#### Bug Fixes

* **highlight:**
  * fix bug when typing not affecting the model ([63d3c186](https://github.com/Apercu/ng-markdown/commit/63d3c18611b29896c7096ccd80e68a14c38bfc46), closes [#11](https://github.com/Apercu/ng-markdown/issues/11))
  * prevent gulp breaks ([f08f01da](https://github.com/Apercu/ng-markdown/commit/f08f01da39591ed188de5ee075305ab810024fda))

#### Features

* **editor:** transform every dot list into markdown ([67801211](https://github.com/Apercu/ng-markdown/commit/67801211410b464ab422e411ccb676d1ffdbb65f), closes [#14](https://github.com/Apercu/ng-markdown/issues/14))
* **gulp:**
  * asynchronous and merge streams ([8b7a4ec9](https://github.com/Apercu/ng-markdown/commit/8b7a4ec95baa8baa8f9a1e2142e74372cc8434da))
  * adding changelog in gulp task ([5a87b9fb](https://github.com/Apercu/ng-markdown/commit/5a87b9fb45bfc0f22775deaa194b28685cb18ffb))
* **highlight:** highlight integration in preview ([53fee7b9](https://github.com/Apercu/ng-markdown/commit/53fee7b9811a5ce0927656f142617323f13269e4))


## 2.1.0 (2014-07-08)


#### Bug Fixes

* **core:** prevent second npm install ([41ec60d1](https://github.com/Apercu/ng-markdown/commit/41ec60d1551487da0877099402bd8fffc6136ee9))
* **gulp:** typo ([16aa3e8d](https://github.com/Apercu/ng-markdown/commit/16aa3e8d4769d8f328e90ac9e0d84eb30efa29b0))
* **karma:** improving conf and package ([ddfe0c28](https://github.com/Apercu/ng-markdown/commit/ddfe0c28eb37f1441e3857fe82000baff9fd68e5))
* **test:**
  * protractor paths files in e2e config ([d92235b6](https://github.com/Apercu/ng-markdown/commit/d92235b6b5140ea0ac44f3301f52a700f015d669))
  * Launching test and coverage support now operational ([5f7cf228](https://github.com/Apercu/ng-markdown/commit/5f7cf22879a92d38cf33332b3d4cc23e7553c22b))
* **travis:**
  * prevent npm from crashing ([59b5559f](https://github.com/Apercu/ng-markdown/commit/59b5559ffe26f3bbbd590911e5d66897b832266e))
  * prevent 500 error for coveralls ([38eb4723](https://github.com/Apercu/ng-markdown/commit/38eb4723e324ff86c1889168c55d8574989bbf55))
  * improving bower install on travis build ([435cf6db](https://github.com/Apercu/ng-markdown/commit/435cf6db17d182308e692a7278fcf65e68d8c317))
  * adding phantomJS ([975d5be9](https://github.com/Apercu/ng-markdown/commit/975d5be9c4c74cc691528ae3718092f2f38d23c6))
  * missing require ([66ddde06](https://github.com/Apercu/ng-markdown/commit/66ddde0619788d559bc4c2f08a4a35e8087cc16a))


#### Features

* **sauce:** Adding SauceLabs, improving Protractor ([7ef11dcb](https://github.com/Apercu/ng-markdown/commit/7ef11dcb8a88b2174b40c24970022bfe42bb00a4))
* **test:** protractor webserver initialized and ready to test ([2056fdbf](https://github.com/Apercu/ng-markdown/commit/2056fdbf5e86e92a5da6adef9669a3587ce3d35c))


## 2.0.0 (2014-07-05)


#### Bug Fixes

* **core:** Switch back to ng-model and $watch to preview refresh purpose ([c2e845c5](https://github.com/Apercu/ng-markdown/commit/c2e845c5536cbc1034576d36ceadd3902ac7bf48), closes [#3](https://github.com/Apercu/ng-markdown/issues/3))
* **style:** background-prompt on all the viewport ([a5bb52fe](https://github.com/Apercu/ng-markdown/commit/a5bb52fe669b2e43b6ce0066e6aa83de8930bf8b), closes [#8](https://github.com/Apercu/ng-markdown/issues/8))
* **travis:**
  * Build Status linking to master branch ([b5cf1f1b](https://github.com/Apercu/ng-markdown/commit/b5cf1f1be09c0dc5e65deac38c6dd9dc4cb3aed1))
  * missing firefox launcher ([d1c6ba3f](https://github.com/Apercu/ng-markdown/commit/d1c6ba3f8bfc446c2029d700d2c4557635a8a5da))


#### Features

* **core:** ability to disable the elasticity of the textarea ([b57971f5](https://github.com/Apercu/ng-markdown/commit/b57971f5b2ea53a45b637a424d88baf1a1a5b8fe), closes [#5](https://github.com/Apercu/ng-markdown/issues/5), [#10](https://github.com/Apercu/ng-markdown/issues/10))


#### Breaking Changes

* Instead of the `content` attribute to bind the value, you should now use the `ng-model`. Closes #3. ([c2e845c5](https://github.com/Apercu/ng-markdown/commit/c2e845c5536cbc1034576d36ceadd3902ac7bf48))
