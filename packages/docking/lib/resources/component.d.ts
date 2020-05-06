import { Resource, ResourceConfig } from "./resource";
import { Config } from "../config";
import { IsotopeNode } from "@isotope/core";
interface ComponentConfig extends Omit<ResourceConfig, "output"> {
    assetsDir: string;
    config: Config;
    outputFolder: string;
    getComponent(name: string): Component | null;
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
    private getComponent;
    /**
     * Creates new Component instance.
     *
     * @param config - Component config.
     */
    constructor(config: ComponentConfig);
    /**
     * Renders component server-side.
     *
     * @param node - Parent IsotopeNode.
     * @param page - Page the component is rendered in.
     * @param content - Component's content.
     * @returns - Rendered component.
     */
    render(node: IsotopeNode, page: string, content?: string): string;
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
