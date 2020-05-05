import { Component } from "../resources";
import { IsotopeNode } from "@isotope/core";
interface TemplateParsingOptions {
    page: string;
    template: string;
    node: IsotopeNode;
    getComponent(name: string): Component | null;
}
interface TemplateParsingOutput {
    components: Component[];
    parsed: string;
}
/**
 * Parses the specified Markdown to HTML string.
 *
 * @param options - Markdown parsing options.
 * @returns - Parsed Markdown.
 */
declare const parseTemplate: ({ getComponent, page, template, node: view }: TemplateParsingOptions) => TemplateParsingOutput;
export { parseTemplate };
