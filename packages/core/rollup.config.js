import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import * as pkg from "./package.json";

/** @type {import('rollup').RollupOptions} */
const config = {
	input: "lib/index.js",
	output: {
		file: "dist/isotope.js",
		name: "Isotope",
		format: "umd",
		banner: [
			"/*!",
			`* ${pkg.name} v${pkg.version}`,
			`* (c) ${pkg.author}`,
			`* ${pkg.license}-licensed`,
			"*/"
		].join("\n ")
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
