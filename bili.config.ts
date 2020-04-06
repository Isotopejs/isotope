import { Config } from "bili";

const config: Config = {
	banner: true,
	bundleNodeModules: false,
	input: "src/index.ts",
	output: {
		fileName: "isotope[min].js",
		format: ["umd", "umd-min"],
		moduleName: "Isotope",
		target: "browser"
	},
	plugins: {
		babel: false,
		typescript2: true
	}
};

export default config;
