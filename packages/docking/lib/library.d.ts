import { Storage } from "./storage";
/**
 * Loads required libraries.
 *
 * @param storage - Docking storage.
 * @returns - HTML string with required <script> tags.
 */
declare const loadLibraries: (storage: Storage) => Promise<string>;
export { loadLibraries };
