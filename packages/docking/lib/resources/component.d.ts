import { Resource, ResourceConfig } from "./resource";
import { Config } from "../config";
import { IsotopeNode } from "@isotope/core";
interface ComponentConfig extends Omit<ResourceConfig, "output"> {
    assetsDir: string;
    config: Config;
    outputFolder: string;
}
declare type ComponentType = "static" | "dynamic" | "universal";
/**
 * Class representing Docking component.
 */
declare class Component extends Resource {
    id: string;
    name: string;
    type?: ComponentType;
    private assetsDir;
    private code?;
    private dockingConfig;
    private func?;
    private rollupCache?;
    /**
     * Creates new Component instance.
     *
     * @param config - Component config.
     */
    constructor(config: ComponentConfig);
    /**
     * Renders component server-side.
     *
     * @param view - Isotope view.
     * @param page - Page the component is rendered in.
     * @param content - Component's content.
     * @returns - Rendered component.
     */
    render(view: IsotopeNode, page: string, content?: string): string;
    /**
     * Processes the component.
     *
     * @param production - If the component should be processed for production.
     */
    process(production?: boolean): Promise<void>;
    /**
     * Evaluates the component's code.
     *
     * @returns - Evaluated component's function.
     */
    private eval;
}
export { Component, ComponentConfig };
