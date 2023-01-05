module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-mesulive`
  extends: ["mesulive"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  ignorePatterns: [".eslintrc.js"],
};
