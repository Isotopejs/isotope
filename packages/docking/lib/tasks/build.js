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
const logger = __importStar(require("../logger"));
const utils = __importStar(require("../utils"));
const library_1 = require("../library");
const parser_1 = require("../parser");
/**
 * Copies assets from input to output folder.
 *
 * @param storage - Docking storage.
 */
const copyAssets = (storage) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const input = storage.getInputFolder("assets");
    const output = storage.getOutputFolder("assets");
    try {
        for (var _b = __asyncValues(utils.readdirp(input)), _c; _c = yield _b.next(), !_c.done;) {
            const entry = _c.value;
            yield storage
                .addAsset({
                input: utils.join(input, entry.path),
                output: utils.join(output, entry.path)
            })
                .process()
                .catch((error) => {
                logger.error("Error while copying assets", error);
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
/**
 * Processes Docking components.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param production - If components should be processed for production.
 */
const processComponents = (storage, config, production) => __awaiter(void 0, void 0, void 0, function* () {
    var e_2, _d;
    const inputFolder = storage.getInputFolder("components");
    const outputFolder = storage.getOutputFolder("components");
    const paths = yield utils.readdir(inputFolder);
    try {
        for (var paths_1 = __asyncValues(paths), paths_1_1; paths_1_1 = yield paths_1.next(), !paths_1_1.done;) {
            const path = paths_1_1.value;
            yield storage
                .addComponent({
                assetsDir: storage.getOutputFolder("assets"),
                config,
                input: utils.join(inputFolder, path),
                outputFolder
            })
                .process(production)
                .catch((error) => {
                logger.error("Error while processing components", error);
            });
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (paths_1_1 && !paths_1_1.done && (_d = paths_1.return)) yield _d.call(paths_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
});
/**
 * Processes Docking content.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param production - If components should be processed for production.
 */
const processContent = (storage, config, production) => __awaiter(void 0, void 0, void 0, function* () {
    var e_3, _e;
    const inputFolder = storage.getInputFolder("content");
    const outputFolder = storage.getOutputFolder("content");
    const template = parser_1.parseHead({
        input: yield utils.readFile("template.html", "utf8"),
        insert: yield library_1.loadLibraries(storage)
    });
    try {
        for (var _f = __asyncValues(utils.readdirp(inputFolder)), _g; _g = yield _f.next(), !_g.done;) {
            const entry = _g.value;
            yield storage
                .addContent({
                assetsDir: storage.getOutputFolder("assets"),
                config,
                contentDir: inputFolder,
                getComponent: (name) => {
                    return storage.getComponent(name);
                },
                input: utils.join(inputFolder, entry.path),
                output: utils.join(outputFolder, entry.path).replace(".md", ".html"),
                template
            })
                .process(production)
                .catch((error) => {
                logger.error("Error while processing content", error);
            });
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_g && !_g.done && (_e = _f.return)) yield _e.call(_f);
        }
        finally { if (e_3) throw e_3.error; }
    }
});
/**
 * Docking build task function.
 *
 * @param storage - Docking storage.
 * @param config - Docking config.
 * @param production - If components should be processed for production.
 */
const build = (storage, config, production = true) => __awaiter(void 0, void 0, void 0, function* () {
    utils.remove(storage.getOutputFolder());
    logger.info("Building");
    logger.startLoader("Copying assets");
    yield copyAssets(storage);
    logger.stopLoader();
    logger.success("Copied assets");
    logger.startLoader("Processing components");
    yield processComponents(storage, config, production);
    logger.stopLoader();
    logger.success("Processed components");
    logger.startLoader("Processing content");
    yield processContent(storage, config, production);
    logger.stopLoader();
    logger.success("Processed content");
    logger.success("Building finished");
});
exports.build = build;
//# sourceMappingURL=build.js.map