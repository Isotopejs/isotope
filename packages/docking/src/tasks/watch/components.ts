import * as chokidar from "chokidar";
import * as logger from "../../logger";
import * as utils from "../../utils";
import { BrowserSyncInstance } from "browser-sync";
import { Config } from "../../config";
import { Storage } from "../../storage";

/**
 * Watches and processes Docking components.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param browserSync - BrowserSync instance.
 */
const watchComponents = (
	storage: Storage,
	config: Config,
	browserSync: BrowserSyncInstance
): void => {
	const inputFolder = storage.getInputFolder("components");
	const outputFolder = storage.getOutputFolder("components");
	const watcher = chokidar.watch(inputFolder, { ignoreInitial: true });

	watcher.on("all", async (event, path) => {
		const relativePath = utils.relative(inputFolder, path);
		const input = utils.join(inputFolder, relativePath);
		const output = utils.join(outputFolder, relativePath);

		logger.startLoader("Processing components");

		if (event === "add") {
			await storage
				.addComponent({
					assetsDir: storage.getOutputFolder("assets"),
					config,
					input,
					outputFolder
				})
				.process()
				.catch((error: Error) => {
					logger.error("Error while processing components", error);
				});
		} else if (event === "change") {
			const name = input
				.slice(inputFolder.length + 1, input.lastIndexOf("."))
				.split("/")[0]
				.toLowerCase();
			const component = storage.getComponent(name);

			if (component) {
				const relatedContent = storage.getRelatedContent(component);

				await component.process().catch((error: Error) => {
					logger.error("Error while processing components", error);
				});
				relatedContent.forEach((content) => {
					return content.process().catch((error: Error) => {
						logger.error("Error while processing content", error);
					});
				});
			}
		} else if (event === "unlink" || event === "unlinkDir") {
			storage.removeComponents(input);
			await utils.remove(output);
		}

		browserSync.reload(output);
		logger.stopLoader();
	});
};

export { watchComponents };
