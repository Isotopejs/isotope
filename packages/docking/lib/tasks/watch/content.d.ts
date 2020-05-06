import { BrowserSyncInstance } from "browser-sync";
import { Config } from "../../config";
import { Storage } from "../../storage";
/**
 * Watches and processes Docking content.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param browserSync - BrowserSync instance.
 */
declare const watchContent: (storage: Storage, config: Config, browserSync: BrowserSyncInstance) => Promise<void>;
export { watchContent };
