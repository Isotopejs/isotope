import * as logger from "../../logger";
import * as utils from "../../utils";
import { Storage } from "../../storage";

/**
 * Copies assets from input to output folder.
 *
 * @param storage - Docking storage.
 * @param lastBuild - Last build data in ms for caching.
 */
const copyAssets = async (storage: Storage, lastBuild?: number): Promise<void> => {
	const inputFolder = storage.getInputFolder("assets");
	const outputFolder = storage.getOutputFolder("assets");

	for await (const entry of utils.readdirp(inputFolder, {
		alwaysStat: Boolean(lastBuild)
	})) {
		const stats = entry.stats || {
			ctimeMs: 0,
			mtimeMs: 0
		};
		const cached = !lastBuild;
		const updated = lastBuild && lastBuild < stats.mtimeMs && lastBuild < stats.ctimeMs;

		if (cached || updated) {
			await storage
				.addAsset({
					input: utils.join(inputFolder, entry.path),
					output: utils.join(outputFolder, entry.path)
				})
				.process()
				.catch((error: Error) => {
					logger.error("Error while copying assets", error);
				});
		}
	}
};

export { copyAssets };
