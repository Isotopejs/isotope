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
 * @param lastBuild - Last build data in ms for caching.
 */
const copyAssets = (storage, lastBuild) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const inputFolder = storage.getInputFolder("assets");
    const outputFolder = storage.getOutputFolder("assets");
    try {
        for (var _b = __asyncValues(utils.readdirp(inputFolder, {
            alwaysStat: Boolean(lastBuild)
        })), _c; _c = yield _b.next(), !_c.done;) {
            const entry = _c.value;
            const stats = entry.stats || {
                ctimeMs: 0,
                mtimeMs: 0
            };
            if (!lastBuild ||
                (lastBuild && lastBuild < stats.mtimeMs && lastBuild < stats.ctimeMs)) {
                yield storage
                    .addAsset({
                    input: utils.join(inputFolder, entry.path),
                    output: utils.join(outputFolder, entry.path)
                })
                    .process()
                    .catch((error) => {
                    logger.error("Error while copying assets", error);
                });
            }
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
 * @param lastBuild - Last build data in ms for caching.
 */
const processComponents = (storage, config, production, lastBuild) => __awaiter(void 0, void 0, void 0, function* () {
    var e_2, _d;
    const inputFolder = storage.getInputFolder("components");
    const outputFolder = storage.getOutputFolder("components");
    try {
        for (var _e = __asyncValues(utils.readdirp(inputFolder, {
            alwaysStat: Boolean(lastBuild),
            depth: 0,
            type: "all"
        })), _f; _f = yield _e.next(), !_f.done;) {
            const entry = _f.value;
            const stats = entry.stats || {
                ctimeMs: 0,
                mtimeMs: 0
            };
            if (!lastBuild ||
                (lastBuild && lastBuild < stats.mtimeMs && lastBuild < stats.ctimeMs)) {
                yield storage
                    .addComponent({
                    assetsDir: storage.getOutputFolder("assets"),
                    config,
                    input: utils.join(inputFolder, entry.path),
                    outputFolder
                })
                    .process(production)
                    .catch((error) => {
                    logger.error("Error while processing components", error);
                });
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_d = _e.return)) yield _d.call(_e);
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
 * @param lastBuild - Last build data in ms for caching.
 */
const processContent = (storage, config, production, lastBuild) => __awaiter(void 0, void 0, void 0, function* () {
    var e_3, _g;
    const inputFolder = storage.getInputFolder("content");
    const outputFolder = storage.getOutputFolder("content");
    const template = parser_1.parseHead({
        input: yield utils.readFile("template.html", "utf8").catch((error) => {
            logger.error("Template file not detected!", error);
            throw error;
        }),
        insert: yield library_1.loadLibraries(storage)
    });
    try {
        for (var _h = __asyncValues(utils.readdirp(inputFolder, {
            alwaysStat: Boolean(lastBuild)
        })), _j; _j = yield _h.next(), !_j.done;) {
            const entry = _j.value;
            const stats = entry.stats || {
                ctimeMs: 0,
                mtimeMs: 0
            };
            if (!lastBuild ||
                (lastBuild && lastBuild < stats.mtimeMs && lastBuild < stats.ctimeMs)) {
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
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_j && !_j.done && (_g = _h.return)) yield _g.call(_h);
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
    let lastBuild = 0;
    if (config.cache) {
        lastBuild =
            (yield utils.readJSON("cache/docking.json", { throws: false }).catch(() => ({})))
                .lastBuild || 0;
    }
    else {
        utils.remove(storage.getOutputFolder());
    }
    logger.info("Building");
    logger.startLoader("Copying assets");
    yield copyAssets(storage, lastBuild);
    logger.stopLoader();
    logger.success("Copied assets");
    logger.startLoader("Processing components");
    yield processComponents(storage, config, production, lastBuild);
    logger.stopLoader();
    logger.success("Processed components");
    logger.startLoader("Processing content");
    yield processContent(storage, config, production, lastBuild);
    logger.stopLoader();
    logger.success("Processed content");
    logger.success("Building finished");
    if (config.cache) {
        yield utils.outputJSON("cache/docking.json", {
            lastBuild: Date.now()
        });
    }
});
exports.build = build;
//# sourceMappingURL=build.js.map