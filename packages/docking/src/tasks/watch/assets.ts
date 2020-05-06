import * as chokidar from "chokidar";
import * as logger from "../../logger";
import * as utils from "../../utils";
import { BrowserSyncInstance } from "browser-sync";
import { Storage } from "../../storage";

/**
 * Watches and copies assets from input to output folder.
 *
 * @param storage - Docking storage.
 * @param browserSync - BrowserSync instance.
 */
const watchAssets = (storage: Storage, browserSync: BrowserSyncInstance): void => {
	const inputFolder = storage.getInputFolder("assets");
	const outputFolder = storage.getOutputFolder("assets");
	const watcher = chokidar.watch(inputFolder, { ignoreInitial: true });

	watcher.on("all", async (event, path) => {
		const relativePath = utils.relative(inputFolder, path);
		const input = utils.join(inputFolder, relativePath);
		const output = utils.join(outputFolder, relativePath);

		logger.startLoader("Updating assets");

		if (event === "add") {
			await storage
				.addAsset({
					input,
					output
				})
				.process()
				.catch((error: Error) => {
					logger.error("Error while copying assets", error);
				});
		} else if (event === "change") {
			const asset = storage.getAsset(input);

			if (asset) {
				await asset.process().catch((error: Error) => {
					logger.error("Error while copying assets", error);
				});
			}
		} else if (event === "unlink" || event === "unlinkDir") {
			storage.removeAssets(input);
			await utils.remove(output);
		}

		browserSync.reload(output);
		logger.stopLoader();
	});
};

export { watchAssets };
