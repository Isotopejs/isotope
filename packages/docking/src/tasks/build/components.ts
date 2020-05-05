import * as logger from "../../logger";
import * as utils from "../../utils";
import { Config } from "../../config";
import { Storage } from "../../storage";

/**
 * Processes Docking components.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param production - If components should be processed for production.
 * @param lastBuild - Last build data in ms for caching.
 */
const processComponents = async (
	storage: Storage,
	config: Config,
	production: boolean,
	lastBuild?: number
): Promise<void> => {
	const inputFolder = storage.getInputFolder("components");
	const outputFolder = storage.getOutputFolder("components");

	for await (const entry of utils.readdirp(inputFolder, {
		alwaysStat: Boolean(lastBuild),
		depth: 0,
		type: "all"
	})) {
		const stats = entry.stats || {
			ctimeMs: 0,
			mtimeMs: 0
		};
		const cached = !lastBuild;
		const updated = lastBuild && lastBuild < stats.mtimeMs && lastBuild < stats.ctimeMs;

		if (cached || updated) {
			await storage
				.addComponent({
					assetsDir: storage.getOutputFolder("assets"),
					config,
					input: utils.join(inputFolder, entry.path),
					outputFolder
				})
				.process(production)
				.catch((error: Error) => {
					logger.error("Error while processing components", error);
				});
		}
	}
};

export { processComponents };
