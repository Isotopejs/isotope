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
/**
 * Generates code for component loading.
 *
 * @param componentId - Loaded component's ID.
 * @param page - Page the component is loaded in.
 * @returns - Generated loading code.
 */
const componentLoaderTemplate = (componentId, page) => {
    return `(() => {
        const elements = document.querySelectorAll(".${componentId}");
        const component = window.${componentId};
        elements.forEach(element => {
            Isotope.createDOMView(element, { attach: true }).$(
                (typeof component === "function" ? component : component.component)("${page}")
            );
            element.removeAttribute("class");
        });
        window.${componentId} = null;
    })();`;
};
/**
 * Parses dynamic components' scripts to HTML string.
 *
 * @param options - Component scripts parsing options.
 * @returns - Parsed scripts.
 */
const parseScripts = ({ cache, components, currentDir, page, production }) => __awaiter(void 0, void 0, void 0, function* () {
    const scriptTags = [];
    const code = [];
    new Set(components).forEach((component) => {
        if (component.type === "dynamic" || component.type === "universal") {
            scriptTags.push(`<script src="${utils.relative(currentDir, component.output)}"></script>`);
            code.push(componentLoaderTemplate(component.id, page));
        }
    });
    if (code.length > 0) {
        const bundleOutput = yield utils.bundle({
            cache,
            code: code.join("\n"),
            production
        });
        scriptTags.push(`<script>${bundleOutput.code}</script>`);
        return {
            cache: bundleOutput.cache,
            parsed: scriptTags.join("\n")
        };
    }
    return {
        parsed: ""
    };
});
exports.parseScripts = parseScripts;
//# sourceMappingURL=scripts.js.map