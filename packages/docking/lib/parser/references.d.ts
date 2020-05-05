import { Config } from "../config";
interface AssetParsingOptions {
    assetsDir: string;
    currentDir: string;
    input: string;
}
interface ConfigParsingOptions {
    config: Config;
    input: string;
}
interface BodyParsingOptions {
    input: string;
    insert: string;
}
interface HeadParsingOptions extends BodyParsingOptions {
}
/**
 * Parses asset: references inside the input string.
 *
 * @param options - Asset parsing options.
 * @returns - Parsed string.
 */
declare const parseAssetReferences: ({ assetsDir, currentDir, input }: AssetParsingOptions) => string;
/**
 * Parses asset: references inside the input string.
 *
 * @param options - Asset parsing options.
 * @returns - Parsed string.
 */
declare const parseConfigReferences: ({ config, input }: ConfigParsingOptions) => string;
/**
 * Parses <body> tag of the input HTML string.
 *
 * @param options - Body parsing options.
 * @returns - Parsed HTML string.
 */
declare const parseBody: ({ input, insert }: BodyParsingOptions) => string;
/**
 * Parses <head> tag of the input HTML string.
 *
 * @param options - Head parsing options.
 * @returns - Parsed HTML string.
 */
declare const parseHead: ({ input, insert }: HeadParsingOptions) => string;
export { parseAssetReferences, parseBody, parseConfigReferences, parseHead };
