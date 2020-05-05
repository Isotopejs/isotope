"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const slash_1 = __importDefault(require("slash"));
exports.slash = slash_1.default;
/**
 * Extracts file name from the path.
 *
 * @param path - Path to be evaluated.
 * @param extension - Optional file extension to be removed from the result.
 * @returns - Extracted file name.
 */
const basename = (path, extension) => {
    return slash_1.default(path_1.basename(path, extension));
};
exports.basename = basename;
/**
 * Extracts directory name from the path.
 *
 * @param path - Path to be evaluated.
 * @returns - Extracted directory name.
 */
const dirname = (path) => {
    return slash_1.default(path_1.dirname(path));
};
exports.dirname = dirname;
/**
 * Joins strings to form a path.
 *
 * @param paths - Strings to be connected.
 * @returns - Generated path.
 */
const join = (...paths) => {
    return slash_1.default(path_1.join(...paths));
};
exports.join = join;
/**
 * Solves relative path between two supplied ones.
 *
 * @param from - The "from" path.
 * @param to - The "to" path.
 * @returns - Relative path.
 *
 */
const relative = (from, to) => {
    return slash_1.default(path_1.relative(from, to));
};
exports.relative = relative;
/**
 * Starting from leftmost {from} parameter, resolves {to} to an absolute path.
 *
 * @param pathSegments - Path segments.
 * @returns - Resolved path.
 */
const resolve = (...pathSegments) => {
    return slash_1.default(path_1.resolve(...pathSegments));
};
exports.resolve = resolve;
//# sourceMappingURL=path.js.map