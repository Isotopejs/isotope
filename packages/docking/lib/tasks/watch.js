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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar = __importStar(require("chokidar"));
const logger = __importStar(require("../logger"));
const utils = __importStar(require("../utils"));
const browser_sync_1 = require("browser-sync");
const chalk_1 = __importDefault(require("chalk"));
const library_1 = require("../library");
const parser_1 = require("../parser");
/**
 * Copies assets from input to output folder.
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
                .process();
        }
        else if (event === "change") {
            const asset = storage.getAsset(input);
            if (asset) {
                yield asset.process();
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
/**
 * Processes Docking components.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param browserSync - BrowserSync instance.
 */
const processComponents = (storage, config, browserSync) => {
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
                .process();
        }
        else if (event === "change") {
            const name = input
                .slice(inputFolder.length + 1, input.lastIndexOf("."))
                .split("/")[0]
                .toLowerCase();
            const component = storage.getComponent(name);
            if (component) {
                const relatedContent = storage.getRelatedContent(component);
                yield component.process();
                relatedContent.forEach((content) => {
                    return content.process();
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
/**
 * Processes Docking content.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param browserSync - BrowserSync instance.
 */
const processContent = (storage, config, browserSync) => __awaiter(void 0, void 0, void 0, function* () {
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
                .process();
        }
        else if (event === "change") {
            const content = storage.getContent(input);
            if (content) {
                yield content.process();
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
    processComponents(storage, config, browserSync);
    processContent(storage, config, browserSync);
    watchAssets(storage, browserSync);
    logger.info(`Watching: ${chalk_1.default.bold.blue(`http://localhost:${browserSync.getOption("port")}`)}`);
};
exports.watch = watch;
//# sourceMappingURL=watch.js.map