import * as path from "path";
import {
	Asset,
	Component,
	ComponentConfig,
	Content,
	ContentConfig,
	ResourceConfig
} from "./resources";
import slash from "slash";

type ResourceType = "assets" | "components" | "content";
/**
 * Class representing Docking's central resource storage.
 */
class Storage {
	private assets: Asset[] = [];

	private components: Component[] = [];

	private content: Content[] = [];

	private folders = {
		assets: "assets",
		components: "components",
		content: "content",
		output: "dist"
	};

	/**
	 * Adds the specified asset to the storage.
	 *
	 * @param assetConfig - Docking asset config.
	 * @returns - Created Docking asset.
	 */
	public addAsset(assetConfig: ResourceConfig): Asset {
		const asset = new Asset({
			input: slash(assetConfig.input),
			output: slash(assetConfig.output)
		});

		this.assets.push(asset);

		return asset;
	}

	/**
	 * Adds the specified component to the storage.
	 *
	 * @param componentConfig - Docking component config.
	 * @returns - Created Docking component.
	 */
	public addComponent(componentConfig: ComponentConfig): Component {
		const component = new Component({
			...componentConfig,
			input: slash(componentConfig.input),
			outputFolder: slash(componentConfig.outputFolder)
		});

		this.components.push(component);

		return component;
	}

	/**
	 * Adds the specified piece of content to the storage.
	 *
	 * @param contentConfig - Docking content config.
	 * @returns - Created Docking content.
	 */
	public addContent(contentConfig: ContentConfig): Content {
		const content = new Content({
			...contentConfig,
			input: slash(contentConfig.input),
			output: slash(contentConfig.output)
		});

		this.content.push(content);

		return content;
	}

	/**
	 * Retrieves asset from the storage.
	 *
	 * @param input - Asset's original input.
	 * @returns - Retrieved asset.
	 */
	public getAsset(input: string): Asset | null {
		return (
			this.assets.find((asset) => {
				return asset.input === input;
			}) || null
		);
	}

	/**
	 * Retrieves content from the storage.
	 *
	 * @param input - Content's original input.
	 * @returns - Retrieved content.
	 */
	public getContent(input: string): Content | null {
		return (
			this.content.find((content) => {
				return content.input === input;
			}) || null
		);
	}

	/**
	 * Retrieves component from the storage.
	 *
	 * @param name - Component's name.
	 * @returns - Retrieved component.
	 */
	public getComponent(name: string): Component | null {
		return (
			this.components.find((component) => {
				return component.name === name;
			}) || null
		);
	}

	/**
	 * Retrieves content pages that use the specified component.
	 *
	 * @param component - Component to be looked for.
	 * @returns - Array of content pages.
	 */
	public getRelatedContent(component: Component): Content[] {
		return this.content.filter((content) => {
			return content.components.includes(component);
		});
	}

	/**
	 * Retrieves the output folder for the specified resource type.
	 *
	 * @param resourceType - Resource type.
	 * @returns - Output folder path.
	 */
	public getOutputFolder(resourceType?: ResourceType): string {
		if (resourceType) {
			return path.join(
				this.folders.output,
				resourceType === "content" ? "" : this.folders[resourceType]
			);
		}

		return this.folders.output;
	}

	/**
	 * Retrieves the input folder for the specified resource type.
	 *
	 * @param resourceType - Resource type.
	 * @returns - Input folder path.
	 */
	public getInputFolder(resourceType: ResourceType): string {
		return this.folders[resourceType];
	}

	/**
	 * Removes assets given an input file/folder.
	 *
	 * @param input - Assets' input path.
	 */
	public removeAssets(input: string): void {
		this.assets = this.assets.filter((asset) => {
			return !asset.input.includes(input);
		});
	}

	/**
	 * Removes components given an input file/folder.
	 *
	 * @param input - Components' input path.
	 */
	public removeComponents(input: string): void {
		this.components = this.components.filter((component) => {
			return !component.input.includes(input);
		});
	}

	/**
	 * Removes content pages given an input file/folder.
	 *
	 * @param input - Content's input path.
	 */
	public removeContent(input: string): void {
		this.content = this.content.filter((content) => {
			return !content.input.includes(input);
		});
	}
}

export { Storage };
