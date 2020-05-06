import { Config } from "../../config";
import { Storage } from "../../storage";
/**
 * Docking build task function.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param production - If components should be processed for production.
 */
declare const build: (storage: Storage, config: Config, production?: boolean) => Promise<void>;
export { build };
