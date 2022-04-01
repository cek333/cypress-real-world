// eslint-disable-next-line no-undef
module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:mocha/recommended',
    'plugin:cypress/recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'plugins': [
    'mocha',
    'cypress'
  ],
  'rules': {
    'indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ]
  }
};
