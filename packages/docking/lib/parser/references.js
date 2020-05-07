"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = __importStar(require("../utils"));
const assetRegExp = /asset:([./\\a-z]+)/g;
const configRegExp = /config:([./\\a-z]+)/g;
/**
 * Parses asset: references inside the input string.
 *
 * @param options - Asset parsing options.
 * @returns - Parsed string.
 */
const parseAssetReferences = ({ assetsDir, currentDir, input }) => {
    assetRegExp.lastIndex = 0;
    return input.replace(assetRegExp, (match, path) => {
        return utils.relative(currentDir, utils.join(assetsDir, path));
    });
};
exports.parseAssetReferences = parseAssetReferences;
/**
 * Parses asset: references inside the input string.
 *
 * @param options - Asset parsing options.
 * @returns - Parsed string.
 */
const parseConfigReferences = ({ config, input }) => {
    configRegExp.lastIndex = 0;
    return input.replace(configRegExp, (match, accessPath) => {
        const keys = accessPath.split(".");
        let property = config;
        keys.forEach((key) => {
            property = (property || {})[key];
        });
        const referencedValue = typeof property === "string" ? property : JSON.stringify(property || null);
        return referencedValue.replace(/"/g, '\\"');
    });
};
exports.parseConfigReferences = parseConfigReferences;
/**
 * Parses <body> tag of the input HTML string.
 *
 * @param options - Body parsing options.
 * @returns - Parsed HTML string.
 */
const parseBody = ({ input, insert }) => {
    return input.replace("</body>", () => {
        return `${insert}</body>`;
    });
};
exports.parseBody = parseBody;
/**
 * Parses <head> tag of the input HTML string.
 *
 * @param options - Head parsing options.
 * @returns - Parsed HTML string.
 */
const parseHead = ({ input, insert }) => {
    return input.replace("</head>", () => {
        return `${insert}</head>`;
    });
};
exports.parseHead = parseHead;
//# sourceMappingURL=references.js.map