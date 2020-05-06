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
const chokidar = __importStar(require("chokidar"));
const logger = __importStar(require("../../logger"));
const utils = __importStar(require("../../utils"));
/**
 * Watches and copies assets from input to output folder.
 *
 * @param storage - Docking storage.
 * @param browserSync - BrowserSync instance.
 */
const watchAssets = (storage, browserSync) => {
    const inputFolder = storage.getInputFolder("assets");
    const outputFolder = storage.getOutputFolder("assets");
    const watcher = chokidar.watch(inputFolder, { ignoreInitial: true });
    watcher.on("all", (event, path) => __awaiter(void 0, void 0, void 0, function* () {
        const relativePath = utils.relative(inputFolder, path);
        const input = utils.join(inputFolder, relativePath);
        const output = utils.join(outputFolder, relativePath);
        logger.startLoader("Updating assets");
        if (event === "add") {
            yield storage
                .addAsset({
                input,
                output
            })
                .process()
                .catch((error) => {
                logger.error("Error while copying assets", error);
            });
        }
        else if (event === "change") {
            const asset = storage.getAsset(input);
            if (asset) {
                yield asset.process().catch((error) => {
                    logger.error("Error while copying assets", error);
                });
            }
        }
        else if (event === "unlink" || event === "unlinkDir") {
            storage.removeAssets(input);
            yield utils.remove(output);
        }
        browserSync.reload(output);
        logger.stopLoader();
    }));
};
exports.watchAssets = watchAssets;
//# sourceMappingURL=assets.js.map