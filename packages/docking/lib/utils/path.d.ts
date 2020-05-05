import slash from "slash";
/**
 * Extracts file name from the path.
 *
 * @param path - Path to be evaluated.
 * @param extension - Optional file extension to be removed from the result.
 * @returns - Extracted file name.
 */
declare const basename: (path: string, extension?: string | undefined) => string;
/**
 * Extracts directory name from the path.
 *
 * @param path - Path to be evaluated.
 * @returns - Extracted directory name.
 */
declare const dirname: (path: string) => string;
/**
 * Joins strings to form a path.
 *
 * @param paths - Strings to be connected.
 * @returns - Generated path.
 */
declare const join: (...paths: string[]) => string;
/**
 * Solves relative path between two supplied ones.
 *
 * @param from - The "from" path.
 * @param to - The "to" path.
 * @returns - Relative path.
 *
 */
declare const relative: (from: string, to: string) => string;
/**
 * Starting from leftmost {from} parameter, resolves {to} to an absolute path.
 *
 * @param pathSegments - Path segments.
 * @returns - Resolved path.
 */
declare const resolve: (...pathSegments: string[]) => string;
export { basename, dirname, join, slash, relative, resolve };
