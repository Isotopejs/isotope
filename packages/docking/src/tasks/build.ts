import * as logger from "../logger";
import * as utils from "../utils";
import { Config } from "../config";
import { Storage } from "../storage";
import { loadLibraries } from "../library";
import { parseHead } from "../parser";

/**
 * Copies assets from input to output folder.
 *
 * @param storage - Docking storage.
 */
const copyAssets = async (storage: Storage): Promise<void> => {
	const input = storage.getInputFolder("assets");
	const output = storage.getOutputFolder("assets");

	for await (const entry of utils.readdirp(input)) {
		await storage
			.addAsset({
				input: utils.join(input, entry.path),
				output: utils.join(output, entry.path)
			})
			.process()
			.catch((error) => {
				logger.error("Error while copying assets", error);
			});
	}
};
/**
 * Processes Docking components.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param production - If components should be processed for production.
 */
const processComponents = async (
	storage: Storage,
	config: Config,
	production: boolean
): Promise<void> => {
	const inputFolder = storage.getInputFolder("components");
	const outputFolder = storage.getOutputFolder("components");
	const paths = await utils.readdir(inputFolder);

	for await (const path of paths) {
		await storage
			.addComponent({
				assetsDir: storage.getOutputFolder("assets"),
				config,
				input: utils.join(inputFolder, path),
				outputFolder
			})
			.process(production)
			.catch((error: Error) => {
				logger.error("Error while processing components", error);
			});
	}
};
/**
 * Processes Docking content.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param production - If components should be processed for production.
 */
const processContent = async (
	storage: Storage,
	config: Config,
	production: boolean
): Promise<void> => {
	const inputFolder = storage.getInputFolder("content");
	const outputFolder = storage.getOutputFolder("content");
	const template = parseHead({
		input: await utils.readFile("template.html", "utf8"),
		insert: await loadLibraries(storage)
	});

	for await (const entry of utils.readdirp(inputFolder)) {
		await storage
			.addContent({
				assetsDir: storage.getOutputFolder("assets"),
				config,
				contentDir: inputFolder,
				getComponent: (name: string) => {
					return storage.getComponent(name);
				},
				input: utils.join(inputFolder, entry.path),
				output: utils.join(outputFolder, entry.path).replace(".md", ".html"),
				template
			})
			.process(production)
			.catch((error: Error) => {
				logger.error("Error while processing content", error);
			});
	}
};
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
	utils.remove(storage.getOutputFolder());
	logger.info("Building");
	logger.startLoader("Copying assets");
	await copyAssets(storage);
	logger.stopLoader();
	logger.success("Copied assets");
	logger.startLoader("Processing components");
	await processComponents(storage, config, production);
	logger.stopLoader();
	logger.success("Processed components");
	logger.startLoader("Processing content");
	await processContent(storage, config, production);
	logger.stopLoader();
	logger.success("Processed content");
	logger.success("Building finished");
};

export { build };
