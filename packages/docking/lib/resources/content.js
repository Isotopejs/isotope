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
const utils = __importStar(require("../utils"));
const resource_1 = require("./resource");
const parser_1 = require("../parser");
const prototope_server_1 = require("@isotope/prototope-server");
const server_1 = require("@isotope/server");
const html_minifier_1 = require("html-minifier");
/**
 * Class representing Docking content page.
 */
class Content extends resource_1.Resource {
    /**
     * Creates new Content instance.
     *
     * @param config - Content config.
     */
    constructor(config) {
        super(config);
        this.components = [];
        this.assetsDir = config.assetsDir;
        this.contentDir = config.contentDir;
        this.template = config.template;
        this.dockingConfig = config.config;
        this.getComponent = config.getComponent;
    }
    /**
     * Processes the content.
     *
     * @param production - If the content should be processed for production.
     */
    process(production = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = this.input
                .slice(this.contentDir.length + 1, this.input.lastIndexOf("."))
                .split("/")[0]
                .toLowerCase();
            const markdown = yield utils.readFile(this.input, "utf8");
            const html = yield this.parse(production, markdown, page);
            yield utils.mkdirp(utils.dirname(this.output));
            yield utils.outputFile(this.output, 
            // prettier-ignore
            production ? html_minifier_1.minify(html, {
                collapseWhitespace: true,
                minifyCSS: { level: 2 },
                minifyJS: true
            }) : html);
        });
    }
    /**
     * Parses the content.
     *
     * @param production - If content should be parsed for production.
     * @param markdown - Markdown to be parsed.
     * @param page - Name of the currently-parsed page.
     * @returns - Parsed HTML-string;.
     */
    parse(production, markdown, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const view = server_1.createStringView("body");
            const { node, getCSS } = view.$(prototope_server_1.PrototopeServer(this.dockingConfig.prototope));
            /** @private */
            const parseReferences = (input) => {
                return parser_1.parseAssetReferences({
                    assetsDir: this.assetsDir,
                    currentDir: utils.dirname(this.output),
                    input: parser_1.parseConfigReferences({
                        config: this.dockingConfig,
                        input
                    })
                });
            };
            const markdownParsingOutput = parser_1.parseMarkdown({
                getComponent: this.getComponent,
                markdown: parseReferences(markdown),
                node,
                page
            });
            const templateParsingOutput = parser_1.parseTemplate({
                getComponent: this.getComponent,
                node,
                page,
                template: parseReferences(this.template)
            });
            const components = [
                ...markdownParsingOutput.components,
                ...templateParsingOutput.components
            ];
            const scriptsParsingOutput = yield parser_1.parseScripts({
                cache: this.rollupCache,
                components,
                currentDir: utils.dirname(this.output),
                page,
                production
            });
            this.rollupCache = scriptsParsingOutput.cache;
            this.components = components;
            return parser_1.parseHead({
                input: parser_1.parseBody({
                    input: templateParsingOutput.parsed,
                    insert: `${markdownParsingOutput.parsed}${scriptsParsingOutput.parsed}`
                }),
                insert: `<style>${getCSS()}</style>`
            });
        });
    }
}
exports.Content = Content;
//# sourceMappingURL=content.js.map