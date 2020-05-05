require("eslint-config-xtrict/patch-eslint6");

module.exports = {
	parserOptions: {
		tsconfigRootDir: __dirname
	},
	env: { browser: true, es6: true },
	root: true,
	extends: ["xtrict"],
	rules: {
		"newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }]
	}
};
