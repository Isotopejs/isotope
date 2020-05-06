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
declare const watchComponents: (storage: Storage, config: Config, browserSync: BrowserSyncInstance) => void;
export { watchComponents };
