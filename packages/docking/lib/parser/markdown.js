"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const markdown_1 = require("@ts-stack/markdown");
/**
 * Class representing Markdown renderer.
 */
class MarkdownRenderer extends markdown_1.Renderer {
    /** @private */
    link(href, title, text) {
        if (this.options.sanitize) {
            const matchEval = /^(?:javascript|(vbscript)|data):/;
            let processedText = "";
            try {
                const { unescape } = this.options;
                processedText = decodeURIComponent(unescape ? unescape(href) : href)
                    .replace(/[^\w:]/g, "")
                    .toLowerCase();
            }
            catch (error) {
                return text;
            }
            if (matchEval.test(processedText)) {
                return text;
            }
        }
        return `<a href="${href.replace(".md", ".html")}" ${title ? `title="${title}"` : ""}>${text}</a>`;
    }
}
const regExp = /^[\t\r ]*{{ *(.+?) *}}([^]*?){{ *\1 *}}[\t\r ]*/;
let currentPage = null;
let currentNode = null;
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
        if (component && currentNode) {
            const rendered = component.render(currentNode, currentPage || "", (match[2] || "").trim());
            parsedComponents.push(component);
            return `${rendered}\n`;
        }
        return "";
    });
    markdown_1.Marked.setOptions({
        isNoP: true,
        renderer: new MarkdownRenderer()
    });
    parsingRuleApplied = true;
};
/**
 * Parses the specified Markdown to HTML string.
 *
 * @param options - Markdown parsing options.
 * @returns - Parsed Markdown.
 */
const parseMarkdown = ({ getComponent, markdown, node, page, resetComponentsList = true }) => {
    const previousPage = currentPage;
    const previousNode = currentNode;
    currentPage = page;
    currentNode = node;
    if (!parsingRuleApplied) {
        setupParsingRule(getComponent);
    }
    const output = {
        components: parsedComponents,
        parsed: markdown_1.Marked.parse(markdown)
    };
    currentPage = previousPage;
    currentNode = previousNode;
    if (resetComponentsList) {
        parsedComponents = [];
    }
    return output;
};
exports.parseMarkdown = parseMarkdown;
//# sourceMappingURL=markdown.js.map