import * as utils from "../utils";
import { Resource, ResourceConfig } from "./resource";
import { parseAssetReferences, parseConfigReferences, parseMarkdown } from "../parser";
import { ComponentFunction } from "../declarations";
import { Config } from "../config";
import { IsotopeNode } from "@isotope/core";
import { RollupCache } from "rollup";
import nodeEval from "eval";

interface ComponentConfig extends Omit<ResourceConfig, "output"> {
	assetsDir: string;
	config: Config;
	outputFolder: string;
	getComponent(name: string): Component | null;
}

type ComponentType = "static" | "dynamic" | "universal";

/**
 * Class representing Docking component.
 */
class Component extends Resource {
	public id: string;

	public name: string;

	public type?: ComponentType;

	private assetsDir: string;

	private code?: string;

	private dockingConfig: Config;

	private func?: ComponentFunction;

	private rollupCache?: RollupCache;

	private getComponent: (name: string) => Component | null;

	/**
	 * Creates new Component instance.
	 *
	 * @param config - Component config.
	 */
	public constructor(config: ComponentConfig) {
		const basename = utils.basename(config.input);
		const extensionIndex = basename.indexOf(".");
		const name = basename
			.slice(0, extensionIndex >= 0 ? extensionIndex : Infinity)
			.toLowerCase();
		const id = utils.hash(name);

		super({
			input: config.input,
			output: utils.join(config.outputFolder, `${id}.js`)
		});
		this.assetsDir = config.assetsDir;
		this.dockingConfig = config.config;
		this.getComponent = config.getComponent;
		this.name = name;
		this.id = id;
	}

	/**
	 * Renders component server-side.
	 *
	 * @param node - Parent IsotopeNode.
	 * @param page - Page the component is rendered in.
	 * @param content - Component's content.
	 * @returns - Rendered component.
	 */
	public render(node: IsotopeNode, page: string, content?: string): string {
		const wrapper = node.div({ classes: [this.id] });

		if (this.type === "static" || this.type === "universal") {
			const component = this.func!(page, content, (content) => {
				return (node) => {
					node.text(
						parseMarkdown({
							getComponent: this.getComponent,
							markdown: content,
							node,
							page,
							resetComponentsList: false
						}).parsed
					);
				};
			});

			wrapper.$(component);
		}

		return `${wrapper}`;
	}

	/**
	 * Processes the component.
	 *
	 * @param production - If the component should be processed for production.
	 */
	public async process(production = false): Promise<void> {
		let { input } = this;

		if (!input.includes(".js") && !input.includes(".ts")) {
			input = utils.join(this.input, "index.js");

			if (!(await utils.pathExists(input))) {
				input = utils.join(this.input, "index.ts");
			}
		}

		const bundleOutput = await utils.bundle({
			cache: this.rollupCache,
			external: {
				"@isotope/core": "Isotope",
				"@isotope/prototope": "Prototope"
			},
			name: this.id,
			path: input,
			production
		});
		const currentDir = utils.dirname(this.output);

		this.rollupCache = bundleOutput.cache;
		this.code = parseAssetReferences({
			assetsDir: this.assetsDir,
			currentDir,
			input: parseConfigReferences({
				config: this.dockingConfig,
				input: bundleOutput.code
			})
		});
		this.func = this.eval();

		if (this.type === "dynamic" || this.type === "universal") {
			await utils.mkdirp(currentDir);
			await utils.outputFile(this.output, this.code, "utf8");
		}
	}

	/**
	 * Evaluates the component's code.
	 *
	 * @returns - Evaluated component's function.
	 */
	private eval(): ComponentFunction {
		const result = nodeEval<
			ComponentFunction | { component: ComponentFunction; type: ComponentType }
		>(this.code!, true);

		if (typeof result === "object") {
			this.type = result.type || "static";

			return result.component;
		}

		this.type = "static";

		return result;
	}
}

export { Component, ComponentConfig };
