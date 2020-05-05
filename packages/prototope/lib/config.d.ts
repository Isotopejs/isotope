import { Config, PartialConfig } from "./declarations";
/**
 * Applies default config options, to partial user's config.
 *
 * @param config - User's config.
 * @returns - Full config object.
 */
declare const applyDefaultConfig: ({ breakpoints, colors }: PartialConfig) => Config;
export { applyDefaultConfig };
