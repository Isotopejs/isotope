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
const utils = __importStar(require("../utils"));
const resource_1 = require("./resource");
const parser_1 = require("../parser");
const eval_1 = __importDefault(require("eval"));
/**
 * Class representing Docking component.
 */
class Component extends resource_1.Resource {
    /**
     * Creates new Component instance.
     *
     * @param config - Component config.
     */
    constructor(config) {
        const basename = utils.basename(config.input);
        const extensionIndex = basename.indexOf(".");
        const name = basename
            .slice(0, extensionIndex >= 0 ? extensionIndex : Infinity)
            .toLowerCase();
        const id = utils.hash(name);
        super({
            input: config.input,
            output: utils.join(config.outputFolder, `${id}.js`)
        });
        this.assetsDir = config.assetsDir;
        this.dockingConfig = config.config;
        this.name = name;
        this.id = id;
    }
    /**
     * Renders component server-side.
     *
     * @param view - Isotope view.
     * @param page - Page the component is rendered in.
     * @param content - Component's content.
     * @returns - Rendered component.
     */
    render(view, page, content) {
        const wrapper = view.div({ classes: [this.id] });
        if (this.type === "static" || this.type === "universal") {
            const component = this.func(page, content);
            wrapper.$(component);
        }
        return `${wrapper}`;
    }
    /**
     * Processes the component.
     *
     * @param production - If the component should be processed for production.
     */
    process(production = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let { input } = this;
            if (!input.includes(".js") && !input.includes(".ts")) {
                input = utils.join(this.input, "index.js");
                if (!(yield utils.pathExists(input))) {
                    input = utils.join(this.input, "index.ts");
                }
            }
            const bundleOutput = yield utils.bundle({
                cache: this.rollupCache,
                external: {
                    "@isotope/core": "Isotope",
                    "@isotope/prototope": "Prototope"
                },
                name: this.id,
                path: input,
                production
            });
            const currentDir = utils.dirname(this.output);
            this.rollupCache = bundleOutput.cache;
            this.code = parser_1.parseAssetReferences({
                assetsDir: this.assetsDir,
                currentDir,
                input: parser_1.parseConfigReferences({
                    config: this.dockingConfig,
                    input: bundleOutput.code
                })
            });
            this.func = this.eval();
            if (this.type === "dynamic" || this.type === "universal") {
                yield utils.mkdirp(currentDir);
                yield utils.outputFile(this.output, this.code, "utf8");
            }
        });
    }
    /**
     * Evaluates the component's code.
     *
     * @returns - Evaluated component's function.
     */
    eval() {
        const result = eval_1.default(this.code, true);
        if (typeof result === "object") {
            this.type = result.type || "static";
            return result.component;
        }
        this.type = "static";
        return result;
    }
}
exports.Component = Component;
//# sourceMappingURL=component.js.map