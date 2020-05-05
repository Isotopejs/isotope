import * as utils from "../utils";
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
interface HeadParsingOptions extends BodyParsingOptions {}

const assetRegExp = /asset:([./\\a-z]+)/g;
const configRegExp = /config:([./\\a-z]+)/g;
/**
 * Parses asset: references inside the input string.
 *
 * @param options - Asset parsing options.
 * @returns - Parsed string.
 */
const parseAssetReferences = ({
	assetsDir,
	currentDir,
	input
}: AssetParsingOptions): string => {
	assetRegExp.lastIndex = 0;

	return input.replace(assetRegExp, (match, path) => {
		return utils.relative(currentDir, utils.join(assetsDir, path));
	});
};
/**
 * Parses asset: references inside the input string.
 *
 * @param options - Asset parsing options.
 * @returns - Parsed string.
 */
const parseConfigReferences = ({ config, input }: ConfigParsingOptions): string => {
	configRegExp.lastIndex = 0;

	return input.replace(configRegExp, (match, accessPath: string) => {
		const keys = accessPath.split(".");

		let property: any = config;

		keys.forEach((key) => {
			property = (property || {})[key];
		});

		return typeof property === "string" ? property : JSON.stringify(property || null);
	});
};
/**
 * Parses <body> tag of the input HTML string.
 *
 * @param options - Body parsing options.
 * @returns - Parsed HTML string.
 */
const parseBody = ({ input, insert }: BodyParsingOptions): string => {
	return input.replace("</body>", () => {
		return `${insert}</body>`;
	});
};
/**
 * Parses <head> tag of the input HTML string.
 *
 * @param options - Head parsing options.
 * @returns - Parsed HTML string.
 */
const parseHead = ({ input, insert }: HeadParsingOptions): string => {
	return input.replace("</head>", () => {
		return `${insert}</head>`;
	});
};

export { parseAssetReferences, parseBody, parseConfigReferences, parseHead };
