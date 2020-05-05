import * as logger from "../../logger";
import * as utils from "../../utils";
import { Config } from "../../config";
import { Storage } from "../../storage";
import { loadLibraries } from "../../library";
import { parseHead } from "../../parser";

/**
 * Processes Docking content.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param production - If components should be processed for production.
 * @param lastBuild - Last build data in ms for caching.
 */
const processContent = async (
	storage: Storage,
	config: Config,
	production: boolean,
	lastBuild?: number
): Promise<void> => {
	const inputFolder = storage.getInputFolder("content");
	const outputFolder = storage.getOutputFolder("content");
	const templatePath = "template.html";
	const templateStats = await utils.stat(templatePath);
	const template = parseHead({
		input: await utils.readFile(templatePath, "utf8").catch((error) => {
			logger.error("Template file not detected!", error);
			throw error;
		}),
		insert: await loadLibraries(storage)
	});
	const templateUpdated =
		lastBuild && lastBuild < templateStats.mtimeMs && lastBuild < templateStats.ctimeMs;

	for await (const entry of utils.readdirp(inputFolder, {
		alwaysStat: Boolean(lastBuild)
	})) {
		const stats = entry.stats || {
			ctimeMs: 0,
			mtimeMs: 0
		};
		const cached = !lastBuild;
		const updated = lastBuild && lastBuild < stats.mtimeMs && lastBuild < stats.ctimeMs;

		if (cached || templateUpdated || updated) {
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
	}
};

export { processContent };
