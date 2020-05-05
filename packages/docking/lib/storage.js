"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const resources_1 = require("./resources");
const slash_1 = __importDefault(require("slash"));
/**
 * Class representing Docking's central resource storage.
 */
class Storage {
    constructor() {
        this.assets = [];
        this.components = [];
        this.content = [];
        this.folders = {
            assets: "assets",
            components: "components",
            content: "content",
            output: "dist"
        };
    }
    /**
     * Adds the specified asset to the storage.
     *
     * @param assetConfig - Docking asset config.
     * @returns - Created Docking asset.
     */
    addAsset(assetConfig) {
        const asset = new resources_1.Asset({
            input: slash_1.default(assetConfig.input),
            output: slash_1.default(assetConfig.output)
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
    addComponent(componentConfig) {
        const component = new resources_1.Component(Object.assign(Object.assign({}, componentConfig), { input: slash_1.default(componentConfig.input), outputFolder: slash_1.default(componentConfig.outputFolder) }));
        this.components.push(component);
        return component;
    }
    /**
     * Adds the specified piece of content to the storage.
     *
     * @param contentConfig - Docking content config.
     * @returns - Created Docking content.
     */
    addContent(contentConfig) {
        const content = new resources_1.Content(Object.assign(Object.assign({}, contentConfig), { input: slash_1.default(contentConfig.input), output: slash_1.default(contentConfig.output) }));
        this.content.push(content);
        return content;
    }
    /**
     * Retrieves asset from the storage.
     *
     * @param input - Asset's original input.
     * @returns - Retrieved asset.
     */
    getAsset(input) {
        return (this.assets.find((asset) => {
            return asset.input === input;
        }) || null);
    }
    /**
     * Retrieves content from the storage.
     *
     * @param input - Content's original input.
     * @returns - Retrieved content.
     */
    getContent(input) {
        return (this.content.find((content) => {
            return content.input === input;
        }) || null);
    }
    /**
     * Retrieves component from the storage.
     *
     * @param name - Component's name.
     * @returns - Retrieved component.
     */
    getComponent(name) {
        return (this.components.find((component) => {
            return component.name === name;
        }) || null);
    }
    /**
     * Retrieves content pages that use the specified component.
     *
     * @param component - Component to be looked for.
     * @returns - Array of content pages.
     */
    getRelatedContent(component) {
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
    getOutputFolder(resourceType) {
        if (resourceType) {
            return path.join(this.folders.output, resourceType === "content" ? "" : this.folders[resourceType]);
        }
        return this.folders.output;
    }
    /**
     * Retrieves the input folder for the specified resource type.
     *
     * @param resourceType - Resource type.
     * @returns - Input folder path.
     */
    getInputFolder(resourceType) {
        return this.folders[resourceType];
    }
    /**
     * Removes assets given an input file/folder.
     *
     * @param input - Assets' input path.
     */
    removeAssets(input) {
        this.assets = this.assets.filter((asset) => {
            return !asset.input.includes(input);
        });
    }
    /**
     * Removes components given an input file/folder.
     *
     * @param input - Components' input path.
     */
    removeComponents(input) {
        this.components = this.components.filter((component) => {
            return !component.input.includes(input);
        });
    }
    /**
     * Removes content pages given an input file/folder.
     *
     * @param input - Content's input path.
     */
    removeContent(input) {
        this.content = this.content.filter((content) => {
            return !content.input.includes(input);
        });
    }
}
exports.Storage = Storage;
//# sourceMappingURL=storage.js.map