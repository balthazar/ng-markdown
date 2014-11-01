'use strict';

describe('ngMarkdown Directive', function () {

  browser.get('/');

  var input = element(by.model('text')),
    preview = element(by.css('.wmd-preview')),
    bind = element(by.css('.bindTest'));

  afterEach(function () {
    input.clear();
  });

  it('should pass this simple test', function() {
    expect(42).toBe(42);
  });

  it('should create some text on basic input', function () {

    input.sendKeys('**happy**');

    preview.getText().then(function (text) {
      expect(text).toBe('happy');
    });

    preview.getInnerHtml().then(function (html) {
      expect(html).toBe('<p><strong>happy</strong></p>');
    });

    input.sendKeys('\nyeah');

    preview.getText().then(function (text) {
      expect(text).toBe('happy yeah');
    });

  });

  it('should change size depending of the text', function () {
    var oldSize;

    input.sendKeys('Begin test');

    input.getSize().then(function (size) {
      oldSize = size;
    });

    input.sendKeys('\n\nHEY IM TOO BIG NOW HALP');
    input.getSize().then(function (size) {
      expect(size.height).toBeGreaterThan(oldSize.height);
      expect(size.width).toEqual(oldSize.width);
      oldSize = size;
    });

    input.clear();

    input.getSize().then(function (size) {
      expect(size.height).toBeLessThan(oldSize.height);
    });

  });

  it('should test some buttons', function () {
    var italic = element(by.css('.wmd-button.markdown-icon-italic'));

    italic.click().then(function () {

      //Little fix for now till resolve of #13
      input.sendKeys(protractor.Key.ARROW_RIGHT);
      input.sendKeys(protractor.Key.ARROW_RIGHT);
      input.sendKeys(' ');

      bind.getText().then(function (text) {
        expect(text).toBe('*emphasized text*');
      });

      /*
      //Not working, really a big problem with these buttons
      input.getInnerHtml().then(function (html) {
        expect(html).toBe('*emphasized text*');
      });
      */

      preview.getText().then(function (text) {
        expect(text).toBe('emphasized text');
      });
    });
  });

});
