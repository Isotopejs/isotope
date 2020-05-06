import { Storage } from "../../storage";
/**
 * Copies assets from input to output folder.
 *
 * @param storage - Docking storage.
 * @param lastBuild - Last build data in ms for caching.
 */
declare const copyAssets: (storage: Storage, lastBuild?: number | undefined) => Promise<void>;
export { copyAssets };
