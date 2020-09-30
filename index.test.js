class Decl {
  constructor(value) {
    this.prop = '-trek-transition';
    this.value = value;
    this.befores = [];
    this.afters = [];
  }
  
  before(string) {
    this.befores.push(string);
    return this;
  }
  
  after(string) {
    this.afters.push(string);
    return this;
  }
  
  remove() {
    return this;
  }
}

test('Default Variables', () => {
  const trekAnimation = require('./index')();
  
  const decl = new Decl('color');
  trekAnimation.Declaration(decl);
  expect(decl.befores.join('-')).toBe('transition-property: color-transition-duration: 500ms-transition-timing-function: cubic-bezier(0.645,0.045,0.355,1.000)');
});

test('Multiple Properties', () => {
  const trekAnimation = require('./index')();
  
  const decl = new Decl('color background-color');
  trekAnimation.Declaration(decl);
  expect(decl.befores.join('-')).toBe('transition-property: color, background-color-transition-duration: 500ms-transition-timing-function: cubic-bezier(0.645,0.045,0.355,1.000)');
});

test('Custom Options', () => {
  const trekAnimation = require('./index')({
    'transition-duration': '1s',
    'transition-function': 'cubic-ease-in'
  });
  
  const decl = new Decl('color');
  trekAnimation.Declaration(decl);
  expect(decl.befores.join('-')).toBe('transition-property: color-transition-duration: 1s-transition-timing-function: cubic-bezier(0.550,0.055,0.675,0.190)');
});

test('Custom Values', () => {
  const trekAnimation = require('./index')();
  
  const decl = new Decl('color border padding 600ms cubic-ease-in');
  trekAnimation.Declaration(decl);
  expect(decl.befores.join('-')).toBe('transition-property: color, border, padding-transition-duration: 600ms-transition-timing-function: cubic-bezier(0.550,0.055,0.675,0.190)');
});