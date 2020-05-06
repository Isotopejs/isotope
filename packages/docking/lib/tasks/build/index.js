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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = __importStar(require("../../logger"));
const utils = __importStar(require("../../utils"));
const assets_1 = require("./assets");
const components_1 = require("./components");
const content_1 = require("./content");
/**
 * Docking build task function.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param production - If components should be processed for production.
 */
const build = (storage, config, production = true) => __awaiter(void 0, void 0, void 0, function* () {
    const cachePath = "cache/docking.json";
    let lastBuild = 0;
    if (config.cache) {
        const cache = yield utils.readJSON(cachePath, { throws: false }).catch(() => ({}));
        lastBuild = cache.lastBuild || 0;
    }
    else {
        yield utils.remove(storage.getOutputFolder());
        yield utils.remove(cachePath);
    }
    logger.info("Building");
    logger.startLoader("Copying assets");
    yield assets_1.copyAssets(storage, lastBuild);
    logger.stopLoader();
    logger.success("Copied assets");
    logger.startLoader("Processing components");
    yield components_1.processComponents(storage, config, production, lastBuild);
    logger.stopLoader();
    logger.success("Processed components");
    logger.startLoader("Processing content");
    yield content_1.processContent(storage, config, production, lastBuild);
    logger.stopLoader();
    logger.success("Processed content");
    logger.success("Building finished");
    if (config.cache) {
        yield utils.outputJSON(cachePath, {
            lastBuild: Date.now()
        });
    }
});
exports.build = build;
//# sourceMappingURL=index.js.map