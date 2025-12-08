module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb'
  ],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'unused-imports'
  ],
  rules: {
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    indent: ['error', 2],
    'space-infix-ops': 'error',
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'max-len': ['error', { code: 1000, ignoreComments: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' }
    ],

    'no-unused-vars': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'react/require-default-props': 'off',

    'react/react-in-jsx-scope': 'off',
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'react/no-unused-prop-types': 'off',
    radix: 'off',
    'no-shadow': 'off',

    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',

    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', {
      vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_'
    }]
  },
  overrides: [
    {
      files: ['**/*.test.{ts,tsx}'],
      rules: {
        'max-len': 'off'
      }
    }
  ]
}
