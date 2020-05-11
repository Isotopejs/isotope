import * as logger from "./logger";
import * as utils from "./utils";
import nodeEval from "eval";

interface Config {
	[property: string]: any;
}

/**
 * Parses code-based config object.
 *
 * @param config - Code-base config to be parsed.
 * @returns - Parsed config object.
 */
const parseConfig = (config: any): Promise<Config> => {
	if (typeof config === "object") {
		if (typeof config.config === "function") {
			return config.config();
		} else if (typeof config.config === "object") {
			return config.config;
		}

		return config;
	}

	return config();
};
/**
 * Loads the config file.
 *
 * @returns - Config object.
 */
const loadConfig = async (): Promise<Config> => {
	let fileName = "";

	logger.startLoader("Loading config");

	if (await utils.pathExists("docking.json")) {
		return utils.readJSON("docking.json");
	}

	if (await utils.pathExists("docking.js")) {
		fileName = "docking.js";
	} else if (await utils.pathExists("docking.ts")) {
		fileName = "docking.ts";
	}

	if (fileName === "") {
		return {};
	}

	const { code } = await utils.bundle({
		name: "config",
		path: fileName
	});
	const config = nodeEval(code);

	logger.stopLoader();
	logger.success("Loaded config");

	return JSON.parse(JSON.stringify(await parseConfig(config)));
};

export { Config, loadConfig };
