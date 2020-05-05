"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rollup_1 = require("rollup");
const plugin_babel_1 = __importDefault(require("@rollup/plugin-babel"));
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
const rollup_plugin_terser_1 = require("rollup-plugin-terser");
const plugin_virtual_1 = __importDefault(require("@rollup/plugin-virtual"));
/**
 * Bundles the supplied input file.
 *
 * @param config - Bundling configuration.
 * @returns - Bundled code and cache.
 */
const bundle = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const extensions = [".js", ".ts"];
    const bundler = yield rollup_1.rollup({
        cache: config.cache,
        external: Object.keys(config.external || {}),
        input: config.path ? config.path : "virtualInputModule",
        onwarn: () => true,
        plugins: [
            ...(config.code ? [plugin_virtual_1.default({ virtualInputModule: config.code })] : []),
            ...(config.production ? [rollup_plugin_terser_1.terser()] : []),
            plugin_commonjs_1.default(),
            plugin_node_resolve_1.default({ extensions }),
            plugin_babel_1.default({
                extensions,
                plugins: ["@babel/plugin-transform-typescript"]
            })
        ]
    });
    const { output } = yield bundler.generate({
        format: config.name ? "umd" : "iife",
        globals: config.external,
        name: config.name
    });
    return {
        cache: bundler.cache,
        code: output[0].code
    };
});
exports.bundle = bundle;
/**
 * Hashes the specified string.
 *
 * @param str - String to be hashed.
 * @returns - Hashed string.
 */
const hash = (str) => {
    const base = 31;
    const maxLength = 10;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (Math.imul(base, hash) + str.charCodeAt(i)) | 0;
    }
    return `h${hash > 0 ? hash : -hash}`.slice(0, maxLength);
};
exports.hash = hash;
//# sourceMappingURL=misc.js.map