import * as chokidar from "chokidar";
import * as logger from "../logger";
import * as utils from "../utils";
import { BrowserSyncInstance, create as createBrowserSync } from "browser-sync";
import { Config } from "../config";
import { Storage } from "../storage";
import chalk from "chalk";
import { loadLibraries } from "../library";
import { parseHead } from "../parser";

/**
 * Copies assets from input to output folder.
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
				.process();
		} else if (event === "change") {
			const asset = storage.getAsset(input);

			if (asset) {
				await asset.process();
			}
		} else if (event === "unlink" || event === "unlinkDir") {
			storage.removeAssets(input);
			await utils.remove(output);
		}

		browserSync.reload(output);
		logger.stopLoader();
	});
};
/**
 * Processes Docking components.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param browserSync - BrowserSync instance.
 */
const processComponents = (
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
				.process();
		} else if (event === "change") {
			const name = input
				.slice(inputFolder.length + 1, input.lastIndexOf("."))
				.split("/")[0]
				.toLowerCase();
			const component = storage.getComponent(name);

			if (component) {
				const relatedContent = storage.getRelatedContent(component);

				await component.process();
				relatedContent.forEach((content) => {
					return content.process();
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
/**
 * Processes Docking content.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param browserSync - BrowserSync instance.
 */
const processContent = async (
	storage: Storage,
	config: Config,
	browserSync: BrowserSyncInstance
): Promise<void> => {
	const inputFolder = storage.getInputFolder("content");
	const outputFolder = storage.getOutputFolder("content");
	const watcher = chokidar.watch(inputFolder, { ignoreInitial: true });
	const template = parseHead({
		input: await utils.readFile("template.html", "utf8"),
		insert: await loadLibraries(storage)
	});

	watcher.on("all", async (event, path) => {
		const relativePath = utils.relative(inputFolder, path);
		const input = utils.join(inputFolder, relativePath);
		const output = utils.join(outputFolder, relativePath).replace(".md", ".html");

		logger.startLoader("Processing content");

		if (event === "add") {
			await storage
				.addContent({
					assetsDir: storage.getOutputFolder("assets"),
					config,
					contentDir: inputFolder,
					getComponent: (name: string) => {
						return storage.getComponent(name);
					},
					input,
					output,
					template
				})
				.process();
		} else if (event === "change") {
			const content = storage.getContent(input);

			if (content) {
				await content.process();
			}
		} else if (event === "unlink" || event === "unlinkDir") {
			storage.removeContent(input);
			await utils.remove(output);
		}

		browserSync.reload(output);
		logger.stopLoader();
	});
};
/**
 * Docking watch task function.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 */
const watch = (storage: Storage, config: Config): void => {
	const browserSync = createBrowserSync();

	browserSync.init({
		logLevel: "silent",
		notify: false,
		open: false,
		server: "dist",
		ui: false
	});
	processComponents(storage, config, browserSync);
	processContent(storage, config, browserSync);
	watchAssets(storage, browserSync);
	logger.info(
		`Watching: ${chalk.bold.blue(`http://localhost:${browserSync.getOption("port")}`)}`
	);
};

export { watch };
