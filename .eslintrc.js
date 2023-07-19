module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier' // add prettier here
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // other rules
    "prettier/prettier": "error"
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
