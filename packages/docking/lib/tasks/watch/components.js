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
 * Watches and processes Docking components.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param browserSync - BrowserSync instance.
 */
const watchComponents = (storage, config, browserSync) => {
    const inputFolder = storage.getInputFolder("components");
    const outputFolder = storage.getOutputFolder("components");
    const watcher = chokidar.watch(inputFolder, { ignoreInitial: true });
    watcher.on("all", (event, path) => __awaiter(void 0, void 0, void 0, function* () {
        const relativePath = utils.relative(inputFolder, path);
        const input = utils.join(inputFolder, relativePath);
        const output = utils.join(outputFolder, relativePath);
        logger.startLoader("Processing components");
        if (event === "add") {
            yield storage
                .addComponent({
                assetsDir: storage.getOutputFolder("assets"),
                config,
                input,
                outputFolder
            })
                .process()
                .catch((error) => {
                logger.error("Error while processing components", error);
            });
        }
        else if (event === "change") {
            const name = input
                .slice(inputFolder.length + 1, input.lastIndexOf("."))
                .split("/")[0]
                .toLowerCase();
            const component = storage.getComponent(name);
            if (component) {
                const relatedContent = storage.getRelatedContent(component);
                yield component.process().catch((error) => {
                    logger.error("Error while processing components", error);
                });
                relatedContent.forEach((content) => {
                    return content.process().catch((error) => {
                        logger.error("Error while processing content", error);
                    });
                });
            }
        }
        else if (event === "unlink" || event === "unlinkDir") {
            storage.removeComponents(input);
            yield utils.remove(output);
        }
        browserSync.reload(output);
        logger.stopLoader();
    }));
};
exports.watchComponents = watchComponents;
//# sourceMappingURL=components.js.map