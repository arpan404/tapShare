const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended", // For React support
    "prettier", // For Prettier
    "eslint-config-turbo",
  ],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser for TypeScript
  parserOptions: {
    ecmaVersion: 2021, // Set to your desired ECMAScript version
    sourceType: "module", // Enable ECMAScript modules
    ecmaFeatures: {
      jsx: true, // Enable JSX
    },
    project: "./tsconfig.json", // Use the project's tsconfig for rules
  },

  plugins: ["react", "only-warn"],

  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },

  ignorePatterns: [
    // Ignore patterns as needed
    "node_modules/",
    ".*.js",
  ],
  overrides: [
    {
      files: ["*.tsx", ".ts"], // Specify file extensions
      parser: "@typescript-eslint/parser", // Specifies the ESLint parser for TypeScript
      rules: {
        "id-match": [
          "error",
          "^([A-Z][A-Z0-9]*)$",
          {
            properties: true,
            onlyDeclarations: true,
            ignoreDestructuring: true,
          },
        ],
      },
    },
  ],
  rules: {},
};
