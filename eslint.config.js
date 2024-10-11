import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2021, // ECMAScript 2021 syntax support
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      js: pluginJs, // JavaScript plugin
      react: pluginReact,
    },
    rules: {
      "react/prop-types": "off", // Disable prop-types validation if using TypeScript
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      "react/jsx-filename-extension": [1, { extensions: [".jsx", ".js"] }], // Allow JSX in .js files
      "react/jsx-no-duplicate-props": ["error", { ignoreCase: true }], // Prevent duplicate props
      "react/self-closing-comp": "warn", // Suggest self-closing for components without children
      "react/no-unescaped-entities": "warn", // Prevent unescaped entities
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
