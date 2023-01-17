module.exports = {
  extends: [
    "next",
    "turbo",
    "prettier",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:storybook/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/no-empty-interface": "off",
    "comma-dangle": [2, "only-multiline"],
    "import/no-extraneous-dependencies": [
      2,
      {
        devDependencies: ["**/*.test.*", "**/*.stories.*", "**/*.config.*"],
      },
    ],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "react/display-name": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-props-no-spreading": [
      2,
      {
        custom: "ignore",
      },
    ],
    "react/jsx-curly-brace-presence": [
      1,
      {
        props: "never",
        children: "never",
      },
    ],
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/no-unknown-property": [
      "error",
      {
        ignore: ["css"],
      },
    ],
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(useRecoilCallback)",
      },
    ],
    "@typescript-eslint/no-namespace": "off",
    "object-shorthand": "warn",
    "@typescript-eslint/no-empty-function": "off",
  },
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
