"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = __importStar(require("../../logger"));
const chalk_1 = __importDefault(require("chalk"));
const browser_sync_1 = require("browser-sync");
const assets_1 = require("./assets");
const components_1 = require("./components");
const content_1 = require("./content");
/**
 * Docking watch task function.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 */
const watch = (storage, config) => {
    const browserSync = browser_sync_1.create();
    browserSync.init({
        logLevel: "silent",
        notify: false,
        open: false,
        server: "dist",
        ui: false
    });
    components_1.watchComponents(storage, config, browserSync);
    content_1.watchContent(storage, config, browserSync);
    assets_1.watchAssets(storage, browserSync);
    logger.info(`Watching: ${chalk_1.default.bold.blue(`http://localhost:${browserSync.getOption("port")}`)}`);
};
exports.watch = watch;
//# sourceMappingURL=index.js.map