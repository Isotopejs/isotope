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
const library_1 = require("../../library");
const parser_1 = require("../../parser");
/**
 * Watches and processes Docking content.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param browserSync - BrowserSync instance.
 */
const watchContent = (storage, config, browserSync) => __awaiter(void 0, void 0, void 0, function* () {
    const inputFolder = storage.getInputFolder("content");
    const outputFolder = storage.getOutputFolder("content");
    const watcher = chokidar.watch(inputFolder, { ignoreInitial: true });
    const template = parser_1.parseHead({
        input: yield utils.readFile("template.html", "utf8"),
        insert: yield library_1.loadLibraries(storage)
    });
    watcher.on("all", (event, path) => __awaiter(void 0, void 0, void 0, function* () {
        const relativePath = utils.relative(inputFolder, path);
        const input = utils.join(inputFolder, relativePath);
        const output = utils.join(outputFolder, relativePath).replace(".md", ".html");
        logger.startLoader("Processing content");
        if (event === "add") {
            yield storage
                .addContent({
                assetsDir: storage.getOutputFolder("assets"),
                config,
                contentDir: inputFolder,
                getComponent: (name) => {
                    return storage.getComponent(name);
                },
                input,
                output,
                template
            })
                .process()
                .catch((error) => {
                logger.error("Error while processing content", error);
            });
        }
        else if (event === "change") {
            const content = storage.getContent(input);
            if (content) {
                yield content.process().catch((error) => {
                    logger.error("Error while processing content", error);
                });
            }
        }
        else if (event === "unlink" || event === "unlinkDir") {
            storage.removeContent(input);
            yield utils.remove(output);
        }
        browserSync.reload(output);
        logger.stopLoader();
    }));
});
exports.watchContent = watchContent;
//# sourceMappingURL=content.js.map