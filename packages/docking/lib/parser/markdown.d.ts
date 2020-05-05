import { Component } from "../resources";
import { IsotopeNode } from "@isotope/core";
interface MarkdownParsingOptions {
    markdown: string;
    page: string;
    node: IsotopeNode;
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
declare const parseMarkdown: ({ getComponent, markdown, page, node: view }: MarkdownParsingOptions) => MarkdownParsingOutput;
export { parseMarkdown };
