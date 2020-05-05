import { Component } from "../resources";
import { IsotopeNode } from "@isotope/core";
import { Marked } from "@ts-stack/markdown";

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

const regExp = /[\t\r ]*{{ *(.+?) *}}([^]*?){{ *\1 *}}[\t\r ]*/;

let currentPage: string | null = null;
let currentView: IsotopeNode | null = null;
let parsedComponents: Component[] = [];
let parsingRuleApplied = false;

/**
 * Sets up the Markdown component parsing rule.
 *
 * @param getComponent - Function used to retrieve components from the storage.
 */
const setupParsingRule = (getComponent: (name: string) => Component | null): void => {
	Marked.setBlockRule(regExp, (match: RegExpExecArray | string[] = []) => {
		const component = getComponent(match[1].toLowerCase());

		if (component && currentView) {
			const rendered = component.render(
				currentView,
				currentPage || "",
				(match[2] || "").trim()
			);

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
const parseMarkdown = ({
	getComponent,
	markdown,
	page,
	node: view
}: MarkdownParsingOptions): MarkdownParsingOutput => {
	currentPage = page;
	currentView = view;

	if (!parsingRuleApplied) {
		setupParsingRule(getComponent);
	}

	const output = {
		components: parsedComponents,
		parsed: Marked.parse(markdown)
	};

	currentPage = null;
	parsedComponents = [];

	return output;
};

export { parseMarkdown };
