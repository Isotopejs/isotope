import * as logger from "../../logger";
import * as utils from "../../utils";
import { Config } from "../../config";
import { Storage } from "../../storage";
import { copyAssets } from "./assets";
import { processComponents } from "./components";
import { processContent } from "./content";

/**
 * Docking build task function.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param production - If components should be processed for production.
 */
const build = async (
	storage: Storage,
	config: Config,
	production = true
): Promise<void> => {
	const cachePath = "cache/docking.json";

	let lastBuild = 0;

	if (config.cache) {
		const cache = await utils.readJSON(cachePath, { throws: false }).catch(() => ({}));

		lastBuild = cache.lastBuild || 0;
	} else {
		await utils.remove(storage.getOutputFolder());
		await utils.remove(cachePath);
	}

	logger.info("Building");
	logger.startLoader("Copying assets");
	await copyAssets(storage, lastBuild);
	logger.stopLoader();
	logger.success("Copied assets");
	logger.startLoader("Processing components");
	await processComponents(storage, config, production, lastBuild);
	logger.stopLoader();
	logger.success("Processed components");
	logger.startLoader("Processing content");
	await processContent(storage, config, production, lastBuild);
	logger.stopLoader();
	logger.success("Processed content");
	logger.success("Building finished");

	if (config.cache) {
		await utils.outputJSON(cachePath, {
			lastBuild: Date.now()
		});
	}
};

export { build };
