interface ResourceConfig {
	input: string;
	output: string;
}
/**
 * Class representing basic Docking resource.
 */
abstract class Resource {
	public input: string;

	public output: string;

	/**
	 * Creates new Resource instance.
	 *
	 * @param config - Resource config.
	 */
	public constructor(config: ResourceConfig) {
		this.input = config.input;
		this.output = config.output;
	}

	/**
	 * Processes the resource.
	 *
	 * @param production - If the resource should be processed for production.
	 */
	public abstract async process(production?: boolean): Promise<any>;
}

export { Resource, ResourceConfig };
