import { Resource } from "./resource";
/**
 * Class representing Docking asset.
 */
declare class Asset extends Resource {
    /**
     * Processes the asset.
     */
    process(): Promise<void>;
}
export { Asset };
