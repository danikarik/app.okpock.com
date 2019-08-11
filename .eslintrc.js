module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true
  },
  plugins: [
    'svelte3'
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    'semi': [
      2,
      'always'
    ],
    'comma-dangle': 2,
    'no-unused-vars': [
      2,
      {
        'ignoreSiblings': true,
        'argsIgnorePattern': 'res|next|event|page|session|^err'
      }
    ],
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ]
  },
  settings: {}
};
