import { Config } from "../../config";
import { Storage } from "../../storage";
/**
 * Docking watch task function.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 */
declare const watch: (storage: Storage, config: Config) => void;
export { watch };
