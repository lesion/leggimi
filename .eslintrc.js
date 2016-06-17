module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'no-trailing-spaces': 0,
    'quotes': ['error'],
    'padded-blocks': 0,
    'no-multiple-empty-lines': 0,
    'curly': 0,
    'keyword-spacing': 0,
    'space-before-blocks': 0,
    'no-unreachable': 0,
    'standard/object-curly-even-spacing': 0,
    'space-in-parens': 0,
    'camelcase': 0,
    'block-spacing': 0,
    'eol-last': 0,
    'spaced-comment': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
