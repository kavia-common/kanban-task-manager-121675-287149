import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default [
  // Base: JS recommended
  pluginJs.configs.recommended,

  // App-wide settings
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      ecmaFeatures: { jsx: true },
      globals: {
        ...globals.browser, // window, document, localStorage, setTimeout, clearTimeout, FileReader
        ...globals.node,    // require in configs/build scripts if any
      }
    },
    plugins: { react: pluginReact },
    rules: {
      // Ergonomic defaults
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^(React|App|_)" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // React rules aligning with React 17+ JSX transform
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error"
    }
  },

  // Tests: provide Jest globals
  {
    files: ["**/*.test.js", "**/__tests__/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      "no-console": "off"
    }
  }
];
