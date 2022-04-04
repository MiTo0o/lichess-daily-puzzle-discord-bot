module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
  },
  rules: {
    // 'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    semi: ["error", "always"],
    "prefer-const": "error",
    eqeqeq: ["error", "always"],
    curly: ["error"],
  },
};
