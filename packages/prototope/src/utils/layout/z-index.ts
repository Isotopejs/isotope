import { Util } from "../../declarations";
import { createUtil } from "../util";

type Z = 0 | 10 | 20 | 30 | 40 | 50 | "auto";

/**
 * Prototope z-index  util.
 *
 * @param z - Z index.
 * @returns - Prototope util.
 */
const z = (z: Z): Util => createUtil({ zIndex: `${z}` as any });

export { z };
