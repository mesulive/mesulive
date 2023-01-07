// eslint-disable-next-line import/no-anonymous-default-export
export default {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
