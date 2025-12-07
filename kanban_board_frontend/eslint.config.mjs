import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/**', 'build/**', 'coverage/**', 'public/**'],
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        // Browser + testing globals used in the project
        document: true,
        window: true,
        navigator: true,
        localStorage: true,
        FileReader: true,
        setTimeout: true,
        clearTimeout: true,
        console: true,
        require: true,
        test: true,
        expect: true,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // React JSX rules for React 17+ (no need to import React)
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',

      // Project-context adjustments:
      // Allow a few helper variables to be intentionally unused (e.g., imported React, App, Node used via JSX)
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^(React|App|_ignored|_unused)$',
          argsIgnorePattern: '^_',
        },
      ],

      // Keep core no-undef on, but browser-specific globals are declared above
      'no-undef': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettierConfig,
];
