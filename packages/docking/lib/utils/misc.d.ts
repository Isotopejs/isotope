import { RollupCache } from "rollup";
interface BundleConfig {
    cache?: RollupCache;
    code?: string;
    path?: string;
    production?: boolean;
    name?: string;
    external?: {
        [id: string]: string;
    };
}
interface BundleOutput {
    code: string;
    cache: RollupCache;
}
/**
 * Bundles the supplied input file.
 *
 * @param config - Bundling configuration.
 * @returns - Bundled code and cache.
 */
declare const bundle: (config: BundleConfig) => Promise<BundleOutput>;
/**
 * Hashes the specified string.
 *
 * @param str - String to be hashed.
 * @returns - Hashed string.
 */
declare const hash: (str: string) => string;
export { bundle, hash };
