import { Marked, Renderer } from "@ts-stack/markdown";
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
 * Class representing Markdown renderer.
 */
class MarkdownRenderer extends Renderer {
	/** @private */
	link(href: string, title: string, text: string): string {
		if (this.options.sanitize) {
			const matchEval = /^(?:javascript|(vbscript)|data):/;

			let processedText = "";

			try {
				const { unescape } = this.options;

				processedText = decodeURIComponent(unescape ? unescape(href) : href)
					.replace(/[^\w:]/g, "")
					.toLowerCase();
			} catch (error) {
				return text;
			}

			if (matchEval.test(processedText)) {
				return text;
			}
		}

		return `<a href="${href.replace(".md", ".html")}" ${
			title ? `title="${title}"` : ""
		}>${text}</a>`;
	}
}

const regExp = /^[\t\r ]*{{ *(.+?) *}}([^]*?){{ *\1 *}}[\t\r ]*/;

let currentPage: string | null = null;
let currentNode: IsotopeNode | null = null;
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

		if (component && currentNode) {
			const rendered = component.render(
				currentNode,
				currentPage || "",
				(match[2] || "").trim()
			);

			parsedComponents.push(component);

			return `${rendered}\n`;
		}

		return "";
	});
	Marked.setOptions({
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
const parseMarkdown = ({
	getComponent,
	markdown,
	node,
	page,
	resetComponentsList = true
}: MarkdownParsingOptions): MarkdownParsingOutput => {
	const previousPage = currentPage;
	const previousNode = currentNode;

	currentPage = page;
	currentNode = node;

	if (!parsingRuleApplied) {
		setupParsingRule(getComponent);
	}

	const output = {
		components: parsedComponents,
		parsed: Marked.parse(markdown)
	};

	currentPage = previousPage;
	currentNode = previousNode;

	if (resetComponentsList) {
		parsedComponents = [];
	}

	return output;
};

export { parseMarkdown };
