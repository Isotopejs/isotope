/**
 * Starts terminal-based loader.
 *
 * @param message - Loader's message.
 */
declare const startLoader: (message: string) => void;
/**
 * Stops terminal-based loader.
 */
declare const stopLoader: () => void;
/**
 * Outputs a message to the console.
 *
 * @param message - Message to be outputted.
 */
declare const info: (message: string) => void;
/**
 * Outputs an error message to the console.
 *
 * @param message - Message to be outputted.
 * @param error - Error object.
 */
declare const error: (message: string, error: Error) => void;
/**
 * Outputs a warning message to the console.
 *
 * @param message - Message to be outputted.
 */
declare const warning: (message: string) => void;
/**
 * Outputs a success message to the console.
 *
 * @param message - Message to be outputted.
 */
declare const success: (message: string) => void;
export { error, info, startLoader, stopLoader, success, warning };
