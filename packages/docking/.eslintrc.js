require("eslint-config-xtrict/patch-eslint6");

module.exports = {
	parserOptions: {
		tsconfigRootDir: __dirname
	},
	env: { browser: true, es6: true },
	root: true,
	extends: ["xtrict"],
	rules: {
		"max-params": [2, 4],
		"newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }]
	}
};
