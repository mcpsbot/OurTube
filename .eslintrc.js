module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
  ],
  plugins: [
    '@typescript-eslint', // Allows for the use of typescript-specific rules
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error', // Ensure Prettier errors are shown as ESLint errors
    // ... other custom rules that you want to adjust for compatibility with TypeScript
  },
};
