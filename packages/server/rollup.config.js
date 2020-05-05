import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import * as pkg from "./package.json";

/** @type {import('rollup').RollupOptions} */
const config = {
	external: ["@isotope/core"],
	input: "lib/index.js",
	output: {
		banner: [
			"/*!",
			`* ${pkg.name} v${pkg.version}`,
			`* (c) ${pkg.author}`,
			`* ${pkg.license}-licensed`,
			"*/"
		].join("\n "),
		file: "dist/isotope-server.js",
		format: "umd",
		globals: { "@isotope/core": "Isotope" },
		name: "IsotopeServer"
	},
	plugins: [
		resolve(),
		terser({
			output: {
				comments: /^!/
			}
		})
	]
};

export default config;
