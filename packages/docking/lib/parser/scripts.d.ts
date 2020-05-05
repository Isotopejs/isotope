import { Component } from "../resources";
import { RollupCache } from "rollup";
interface ComponentsParsingOptions {
    cache?: RollupCache;
    components: Component[];
    currentDir: string;
    page: string;
    production: boolean;
}
interface ComponentsParsingOutput {
    cache?: RollupCache;
    parsed: string;
}
/**
 * Parses dynamic components' scripts to HTML string.
 *
 * @param options - Component scripts parsing options.
 * @returns - Parsed scripts.
 */
declare const parseScripts: ({ cache, components, currentDir, page, production }: ComponentsParsingOptions) => Promise<ComponentsParsingOutput>;
export { parseScripts };
