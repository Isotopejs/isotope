import {
	basename as pathBasename,
	dirname as pathDirname,
	join as pathJoin,
	relative as pathRelative,
	resolve as pathResolve
} from "path";
import slash from "slash";

/**
 * Extracts file name from the path.
 *
 * @param path - Path to be evaluated.
 * @param extension - Optional file extension to be removed from the result.
 * @returns - Extracted file name.
 */
const basename = (path: string, extension?: string): string => {
	return slash(pathBasename(path, extension));
};
/**
 * Extracts directory name from the path.
 *
 * @param path - Path to be evaluated.
 * @returns - Extracted directory name.
 */
const dirname = (path: string): string => {
	return slash(pathDirname(path));
};
/**
 * Joins strings to form a path.
 *
 * @param paths - Strings to be connected.
 * @returns - Generated path.
 */
const join = (...paths: string[]): string => {
	return slash(pathJoin(...paths));
};
/**
 * Solves relative path between two supplied ones.
 *
 * @param from - The "from" path.
 * @param to - The "to" path.
 * @returns - Relative path.
 *
 */
const relative = (from: string, to: string): string => {
	return slash(pathRelative(from, to));
};
/**
 * Starting from leftmost {from} parameter, resolves {to} to an absolute path.
 *
 * @param pathSegments - Path segments.
 * @returns - Resolved path.
 */
const resolve = (...pathSegments: string[]): string => {
	return slash(pathResolve(...pathSegments));
};

export { basename, dirname, join, slash, relative, resolve };
