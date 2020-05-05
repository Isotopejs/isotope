import { Asset, Component, ComponentConfig, Content, ContentConfig, ResourceConfig } from "./resources";
declare type ResourceType = "assets" | "components" | "content";
/**
 * Class representing Docking's central resource storage.
 */
declare class Storage {
    private assets;
    private components;
    private content;
    private folders;
    /**
     * Adds the specified asset to the storage.
     *
     * @param assetConfig - Docking asset config.
     * @returns - Created Docking asset.
     */
    addAsset(assetConfig: ResourceConfig): Asset;
    /**
     * Adds the specified component to the storage.
     *
     * @param componentConfig - Docking component config.
     * @returns - Created Docking component.
     */
    addComponent(componentConfig: ComponentConfig): Component;
    /**
     * Adds the specified piece of content to the storage.
     *
     * @param contentConfig - Docking content config.
     * @returns - Created Docking content.
     */
    addContent(contentConfig: ContentConfig): Content;
    /**
     * Retrieves asset from the storage.
     *
     * @param input - Asset's original input.
     * @returns - Retrieved asset.
     */
    getAsset(input: string): Asset | null;
    /**
     * Retrieves content from the storage.
     *
     * @param input - Content's original input.
     * @returns - Retrieved content.
     */
    getContent(input: string): Content | null;
    /**
     * Retrieves component from the storage.
     *
     * @param name - Component's name.
     * @returns - Retrieved component.
     */
    getComponent(name: string): Component | null;
    /**
     * Retrieves content pages that use the specified component.
     *
     * @param component - Component to be looked for.
     * @returns - Array of content pages.
     */
    getRelatedContent(component: Component): Content[];
    /**
     * Retrieves the output folder for the specified resource type.
     *
     * @param resourceType - Resource type.
     * @returns - Output folder path.
     */
    getOutputFolder(resourceType?: ResourceType): string;
    /**
     * Retrieves the input folder for the specified resource type.
     *
     * @param resourceType - Resource type.
     * @returns - Input folder path.
     */
    getInputFolder(resourceType: ResourceType): string;
    /**
     * Removes assets given an input file/folder.
     *
     * @param input - Assets' input path.
     */
    removeAssets(input: string): void;
    /**
     * Removes components given an input file/folder.
     *
     * @param input - Components' input path.
     */
    removeComponents(input: string): void;
    /**
     * Removes content pages given an input file/folder.
     *
     * @param input - Content's input path.
     */
    removeContent(input: string): void;
}
export { Storage };
