import { Config, PartialConfig } from "./declarations";

const defaults: Config = {
	breakpoints: {
		lg: 1024,
		md: 768,
		sm: 640,
		xl: 1280
	},
	colors: {
		dark: "#595b66",
		darker: "#1f2026",
		light: "#ecedef",
		lighter: "#f2f3f5",
		primary: "#e65100",
		secondary: "#ff9d00"
	}
};
/**
 * Applies default config options, to partial user's config.
 *
 * @param config - User's config.
 * @returns - Full config object.
 */
const applyDefaultConfig = ({ breakpoints = {}, colors = {} }: PartialConfig): Config => {
	return {
		breakpoints: Object.assign(defaults.breakpoints, breakpoints),
		colors: Object.assign(defaults.colors, colors)
	};
};

export { applyDefaultConfig };
