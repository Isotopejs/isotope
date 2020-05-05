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
const logger = __importStar(require("./logger"));
const utils = __importStar(require("./utils"));
const eval_1 = __importDefault(require("eval"));
/**
 * Parses code-based config object.
 *
 * @param config - Code-base config to be parsed.
 * @returns - Parsed config object.
 */
const parseConfig = (config) => {
    if (typeof config === "object") {
        if (typeof config.config === "function") {
            return config.config();
        }
        else if (typeof config.config === "object") {
            return config.config;
        }
        return config;
    }
    return config();
};
/**
 * Loads the config file.
 *
 * @returns - Config object.
 */
const loadConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    let fileName = "";
    logger.startLoader("Loading config");
    if (yield utils.pathExists("docking.json")) {
        return utils.readJSON("docking.json");
    }
    if (yield utils.pathExists("docking.js")) {
        fileName = "docking.js";
    }
    else if (yield utils.pathExists("docking.ts")) {
        fileName = "docking.ts";
    }
    if (fileName === "") {
        return {};
    }
    const { code } = yield utils.bundle({
        name: "config",
        path: fileName
    });
    const config = eval_1.default(code);
    logger.stopLoader();
    logger.success("Loaded config");
    return JSON.parse(JSON.stringify(parseConfig(config)));
});
exports.loadConfig = loadConfig;
//# sourceMappingURL=config.js.map