import { Config } from "../../config";
import { Storage } from "../../storage";
/**
 * Processes Docking components.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param production - If components should be processed for production.
 * @param lastBuild - Last build data in ms for caching.
 */
declare const processComponents: (storage: Storage, config: Config, production: boolean, lastBuild?: number | undefined) => Promise<void>;
export { processComponents };
