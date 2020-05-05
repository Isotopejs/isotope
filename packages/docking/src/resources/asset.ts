import * as utils from "../utils";
import { Resource } from "./resource";

/**
 * Class representing Docking asset.
 */
class Asset extends Resource {
	/**
	 * Processes the asset.
	 */
	public async process(): Promise<void> {
		await utils.copy(this.input, this.output);
	}
}

export { Asset };
