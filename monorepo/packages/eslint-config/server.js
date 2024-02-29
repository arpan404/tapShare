module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:node/recommended",
    "plugin:express/recommended",
  ],
  plugins: ["@typescript-eslint", "node", "express"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off", // Allow implicit return type for Express.js routes
    "@typescript-eslint/no-explicit-any": "off", // Allow the use of 'any' type
  },
};
