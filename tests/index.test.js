const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
const dom = new JSDOM(html);
const { document } = dom.window;

describe('Static index.html', () => {
  test('should have correct title', () => {
    expect(document.title).toBe('헬로우 월드');
  });

  test('should contain a form element', () => {
    const form = document.querySelector('form');
    expect(form).toBeNull();
  });
});
