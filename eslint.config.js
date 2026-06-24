import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "test-results/**", "playwright-report/**", "**/*.ts", "**/*.tsx"]
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022
      }
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }]
    }
  },
  {
    files: ["tests/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
        describe: "readonly",
        expect: "readonly",
        it: "readonly"
      }
    }
  }
];
