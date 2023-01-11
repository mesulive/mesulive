// eslint-disable-next-line import/no-anonymous-default-export
export default {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "jest-environment-jsdom",
};
