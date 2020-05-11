import * as utils from "../utils";
import { Resource, ResourceConfig } from "./resource";
import {
	parseAssetReferences,
	parseBody,
	parseConfigReferences,
	parseHead,
	parseMarkdown,
	parseScripts,
	parseTemplate
} from "../parser";
import { Component } from "./component";
import { Config } from "../config";
import { PrototopeServer } from "@isotope/prototope-server";
import { RollupCache } from "rollup";
import { createStringView } from "@isotope/server";
import { minify } from "html-minifier";

interface ContentConfig extends ResourceConfig {
	assetsDir: string;
	config: Config;
	contentDir: string;
	template: string;
	getComponent(name: string): Component | null;
}

/**
 * Class representing Docking content page.
 */
class Content extends Resource {
	public components: Component[] = [];

	private assetsDir: string;

	private contentDir: string;

	private dockingConfig: Config;

	private getComponent: (name: string) => Component | null;

	private template: string;

	private rollupCache?: RollupCache;

	/**
	 * Creates new Content instance.
	 *
	 * @param config - Content config.
	 */
	public constructor(config: ContentConfig) {
		super(config);
		this.assetsDir = config.assetsDir;
		this.contentDir = config.contentDir;
		this.template = config.template;
		this.dockingConfig = config.config;
		this.getComponent = config.getComponent;
	}

	/**
	 * Processes the content.
	 *
	 * @param production - If the content should be processed for production.
	 */
	public async process(production = false): Promise<void> {
		const page = this.input
			.slice(this.contentDir.length + 1, this.input.lastIndexOf("."))
			.split("/")[0]
			.toLowerCase();
		const markdown = await utils.readFile(this.input, "utf8");
		const html = await this.parse(production, markdown, page);

		await utils.mkdirp(utils.dirname(this.output));
		await utils.outputFile(
			this.output,
			// prettier-ignore
			production ? minify(html, {
				collapseWhitespace: true,
				minifyCSS: { level: 2 },
				minifyJS: true
			}) : html
		);
	}

	/**
	 * Parses the content.
	 *
	 * @param production - If content should be parsed for production.
	 * @param markdown - Markdown to be parsed.
	 * @param page - Name of the currently-parsed page.
	 * @returns - Parsed HTML-string;.
	 */
	private async parse(
		production: boolean,
		markdown: string,
		page: string
	): Promise<string> {
		const view = createStringView("body");
		const { node, getCSS } = view.$(PrototopeServer(this.dockingConfig.prototope));
		/** @private */
		const parseReferences = (input: string): string => {
			return parseAssetReferences({
				assetsDir: this.assetsDir,
				currentDir: utils.dirname(this.output),
				input: parseConfigReferences({
					config: this.dockingConfig,
					input
				})
			});
		};
		const markdownParsingOutput = parseMarkdown({
			getComponent: this.getComponent,
			markdown: parseReferences(markdown),
			node,
			page
		});
		const templateParsingOutput = parseTemplate({
			getComponent: this.getComponent,
			node,
			page,
			template: parseReferences(this.template)
		});
		const components = [
			...markdownParsingOutput.components,
			...templateParsingOutput.components
		];
		const scriptsParsingOutput = await parseScripts({
			cache: this.rollupCache,
			components,
			currentDir: utils.dirname(this.output),
			page,
			production
		});

		this.rollupCache = scriptsParsingOutput.cache;
		this.components = components;

		return parseHead({
			input: parseBody({
				input: templateParsingOutput.parsed,
				insert: `${markdownParsingOutput.parsed}${scriptsParsingOutput.parsed}`
			}),
			insert: `<style>${getCSS()}</style>`
		});
	}
}

export { Content, ContentConfig };
