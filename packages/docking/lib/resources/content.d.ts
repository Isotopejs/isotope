import { Resource, ResourceConfig } from "./resource";
import { Component } from "./component";
import { Config } from "../config";
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
declare class Content extends Resource {
    components: Component[];
    private assetsDir;
    private contentDir;
    private dockingConfig;
    private getComponent;
    private template;
    private rollupCache?;
    /**
     * Creates new Content instance.
     *
     * @param config - Content config.
     */
    constructor(config: ContentConfig);
    /**
     * Processes the content.
     *
     * @param production - If the content should be processed for production.
     */
    process(production?: boolean): Promise<void>;
    /**
     * Parses the content.
     *
     * @param production - If content should be parsed for production.
     * @param markdown - Markdown to be parsed.
     * @param page - Name of the currently-parsed page.
     * @returns - Parsed HTML-string;.
     */
    private parse;
}
export { Content, ContentConfig };
