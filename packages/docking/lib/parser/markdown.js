"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const markdown_1 = require("@ts-stack/markdown");
const regExp = /^[\t\r ]*{{ *(.+?) *}}([^]*?){{ *\1 *}}[\t\r ]*/;
let currentPage = null;
let currentView = null;
let parsedComponents = [];
let parsingRuleApplied = false;
/**
 * Sets up the Markdown component parsing rule.
 *
 * @param getComponent - Function used to retrieve components from the storage.
 */
const setupParsingRule = (getComponent) => {
    markdown_1.Marked.setBlockRule(regExp, (match = []) => {
        const component = getComponent(match[1].toLowerCase());
        if (component && currentView) {
            const rendered = component.render(currentView, currentPage || "", (match[2] || "").trim());
            parsedComponents.push(component);
            return `${rendered}\n`;
        }
        return "";
    });
    parsingRuleApplied = true;
};
/**
 * Parses the specified Markdown to HTML string.
 *
 * @param options - Markdown parsing options.
 * @returns - Parsed Markdown.
 */
const parseMarkdown = ({ getComponent, markdown, page, node: view }) => {
    currentPage = page;
    currentView = view;
    if (!parsingRuleApplied) {
        setupParsingRule(getComponent);
    }
    const output = {
        components: parsedComponents,
        parsed: markdown_1.Marked.parse(markdown)
    };
    currentPage = null;
    parsedComponents = [];
    return output;
};
exports.parseMarkdown = parseMarkdown;
//# sourceMappingURL=markdown.js.map