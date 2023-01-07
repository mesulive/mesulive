// eslint-disable-next-line import/no-anonymous-default-export
export default {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^~shared/(.*)$": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
