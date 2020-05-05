import * as chokidar from "chokidar";
import * as logger from "../../logger";
import * as utils from "../../utils";
import { BrowserSyncInstance } from "browser-sync";
import { Config } from "../../config";
import { Storage } from "../../storage";
import { loadLibraries } from "../../library";
import { parseHead } from "../../parser";

/**
 * Watches and processes Docking content.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param browserSync - BrowserSync instance.
 */
const watchContent = async (
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

export { watchContent };
