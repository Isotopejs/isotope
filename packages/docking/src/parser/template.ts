import { Component } from "../resources";
import { IsotopeNode } from "@isotope/core";

const regExp = /[\t\r ]*{{ *(.+?) *}}([^]*?){{ *\1 *}}[\t\r ]*/g;

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
const parseTemplate = ({
	getComponent,
	page,
	template,
	node: view
}: TemplateParsingOptions): TemplateParsingOutput => {
	const components: Component[] = [];
	const parsedTemplate = template.replace(
		regExp,
		(match, componentName: string, content: string) => {
			const component = getComponent(componentName.toLowerCase());

			if (component) {
				const rendered = component.render(view, page, (content || "").trim());

				components.push(component);

				return `${rendered}\n`;
			}

			return "";
		}
	);

	return {
		components,
		parsed: parsedTemplate
	};
};

export { parseTemplate };
