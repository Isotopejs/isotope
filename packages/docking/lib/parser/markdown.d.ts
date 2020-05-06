import { Component } from "../resources";
import { IsotopeNode } from "@isotope/core";
interface MarkdownParsingOptions {
    markdown: string;
    node: IsotopeNode;
    page: string;
    resetComponentsList?: boolean;
    getComponent(name: string): Component | null;
}
interface MarkdownParsingOutput {
    components: Component[];
    parsed: string;
}
/**
 * Parses the specified Markdown to HTML string.
 *
 * @param options - Markdown parsing options.
 * @returns - Parsed Markdown.
 */
declare const parseMarkdown: ({ getComponent, markdown, node, page, resetComponentsList }: MarkdownParsingOptions) => MarkdownParsingOutput;
export { parseMarkdown };
