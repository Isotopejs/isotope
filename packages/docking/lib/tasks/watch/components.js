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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
 * Processes a change in component's code.
 *
 * @param changeParameters - Process parameters.
 */
const processComponentChange = ({ input, inputFolder, storage }) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
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
        try {
            for (var relatedContent_1 = __asyncValues(relatedContent), relatedContent_1_1; relatedContent_1_1 = yield relatedContent_1.next(), !relatedContent_1_1.done;) {
                const content = relatedContent_1_1.value;
                content.process().catch((error) => {
                    logger.error("Error while processing content", error);
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (relatedContent_1_1 && !relatedContent_1_1.done && (_a = relatedContent_1.return)) yield _a.call(relatedContent_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
});
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
                getComponent: (name) => {
                    return storage.getComponent(name);
                },
                input,
                outputFolder
            })
                .process()
                .catch((error) => {
                logger.error("Error while processing components", error);
            });
        }
        else if (event === "change") {
            yield processComponentChange({
                input,
                inputFolder,
                storage
            });
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