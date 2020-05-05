module.exports = {
	preset: "ts-jest",
	runner: "jest-electron/runner",
	testEnvironment: "jest-electron/environment",
	globals: {
		"ts-jest": {
			diagnostics: false,
			packageJson: "package.json"
		}
	},
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.ts"],
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70
		}
	}
};
