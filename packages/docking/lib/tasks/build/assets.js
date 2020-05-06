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
const logger = __importStar(require("../../logger"));
const utils = __importStar(require("../../utils"));
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
            const cached = !lastBuild;
            const updated = lastBuild && lastBuild < stats.mtimeMs && lastBuild < stats.ctimeMs;
            if (cached || updated) {
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
exports.copyAssets = copyAssets;
//# sourceMappingURL=assets.js.map