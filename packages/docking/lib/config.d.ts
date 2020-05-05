interface Config {
    [property: string]: any;
}
/**
 * Loads the config file.
 *
 * @returns - Config object.
 */
declare const loadConfig: () => Promise<Config>;
export { Config, loadConfig };
