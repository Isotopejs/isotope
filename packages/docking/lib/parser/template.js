"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regExp = /[\t\r ]*{{ *(.+?) *}}([^]*?){{ *\1 *}}[\t\r ]*/g;
/**
 * Parses the specified Markdown to HTML string.
 *
 * @param options - Markdown parsing options.
 * @returns - Parsed Markdown.
 */
const parseTemplate = ({ getComponent, page, template, node: view }) => {
    const components = [];
    const parsedTemplate = template.replace(regExp, (match, componentName, content) => {
        const component = getComponent(componentName.toLowerCase());
        if (component) {
            const rendered = component.render(view, page, (content || "").trim());
            components.push(component);
            return `${rendered}\n`;
        }
        return "";
    });
    return {
        components,
        parsed: parsedTemplate
    };
};
exports.parseTemplate = parseTemplate;
//# sourceMappingURL=template.js.map