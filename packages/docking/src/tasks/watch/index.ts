import * as logger from "../../logger";
import { Config } from "../../config";
import { Storage } from "../../storage";
import chalk from "chalk";
import { create as createBrowserSync } from "browser-sync";
import { watchAssets } from "./assets";
import { watchComponents } from "./components";
import { watchContent } from "./content";

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
	watchComponents(storage, config, browserSync);
	watchContent(storage, config, browserSync);
	watchAssets(storage, browserSync);
	logger.info(
		`Watching: ${chalk.bold.blue(`http://localhost:${browserSync.getOption("port")}`)}`
	);
};

export { watch };
