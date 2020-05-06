import { BrowserSyncInstance } from "browser-sync";
import { Storage } from "../../storage";
/**
 * Watches and copies assets from input to output folder.
 *
 * @param storage - Docking storage.
 * @param browserSync - BrowserSync instance.
 */
declare const watchAssets: (storage: Storage, browserSync: BrowserSyncInstance) => void;
export { watchAssets };
