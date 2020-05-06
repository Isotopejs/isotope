import * as chokidar from "chokidar";
import * as logger from "../../logger";
import * as utils from "../../utils";
import { BrowserSyncInstance } from "browser-sync";
import { Config } from "../../config";
import { Storage } from "../../storage";

interface ComponentChangeParameters {
	input: string;
	inputFolder: string;
	storage: Storage;
}

/**
 * Processes a change in component's code.
 *
 * @param changeParameters - Process parameters.
 */
const processComponentChange = async ({
	input,
	inputFolder,
	storage
}: ComponentChangeParameters): Promise<void> => {
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

		for await (const content of relatedContent) {
			content.process().catch((error: Error) => {
				logger.error("Error while processing content", error);
			});
		}
	}
};
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
					getComponent: (name: string) => {
						return storage.getComponent(name);
					},
					input,
					outputFolder
				})
				.process()
				.catch((error: Error) => {
					logger.error("Error while processing components", error);
				});
		} else if (event === "change") {
			await processComponentChange({
				input,
				inputFolder,
				storage
			});
		} else if (event === "unlink" || event === "unlinkDir") {
			storage.removeComponents(input);
			await utils.remove(output);
		}

		browserSync.reload(output);
		logger.stopLoader();
	});
};

export { watchComponents };
