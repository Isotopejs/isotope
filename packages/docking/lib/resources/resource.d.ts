interface ResourceConfig {
    input: string;
    output: string;
}
/**
 * Class representing basic Docking resource.
 */
declare abstract class Resource {
    input: string;
    output: string;
    /**
     * Creates new Resource instance.
     *
     * @param config - Resource config.
     */
    constructor(config: ResourceConfig);
    /**
     * Processes the resource.
     *
     * @param production - If the resource should be processed for production.
     */
    abstract process(production?: boolean): Promise<any>;
}
export { Resource, ResourceConfig };
