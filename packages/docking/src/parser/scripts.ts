import * as utils from "../utils";
import { Component } from "../resources";
import { RollupCache } from "rollup";

interface ComponentsParsingOptions {
	cache?: RollupCache;
	components: Component[];
	currentDir: string;
	page: string;
	production: boolean;
}
interface ComponentsParsingOutput {
	cache?: RollupCache;
	parsed: string;
}

/**
 * Generates code for component loading.
 *
 * @param componentId - Loaded component's ID.
 * @param page - Page the component is loaded in.
 * @returns - Generated loading code.
 */
const componentLoaderTemplate = (componentId: string, page: string): string => {
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
const parseScripts = async ({
	cache,
	components,
	currentDir,
	page,
	production
}: ComponentsParsingOptions): Promise<ComponentsParsingOutput> => {
	const scriptTags: string[] = [];
	const code: string[] = [];

	new Set(components).forEach((component) => {
		if (component.type === "dynamic" || component.type === "universal") {
			scriptTags.push(
				`<script src="${utils.relative(currentDir, component.output)}"></script>`
			);
			code.push(componentLoaderTemplate(component.id, page));
		}
	});

	if (code.length > 0) {
		const bundleOutput = await utils.bundle({
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
};

export { parseScripts };
