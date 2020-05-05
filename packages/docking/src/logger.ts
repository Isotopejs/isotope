/* eslint-disable no-console */
import * as symbols from "log-symbols";
import chalk from "chalk";
import ora from "ora";

const loader = ora();
/**
 * Starts terminal-based loader.
 *
 * @param message - Loader's message.
 */
const startLoader = (message: string): void => {
	loader.start(message);
};
/**
 * Stops terminal-based loader.
 */
const stopLoader = (): void => {
	loader.stop();
};
/**
 * Outputs a message to the console.
 *
 * @param message - Message to be outputted.
 */
const info = (message: string): void => {
	const fullMessage = `${chalk.bold.blue(symbols.info)} ${message}`;

	if (loader.isSpinning) {
		stopLoader();
	}

	console.log(fullMessage);
};
/**
 * Outputs an error message to the console.
 *
 * @param message - Message to be outputted.
 * @param error - Error object.
 */
const error = (message: string, error: Error): void => {
	const fullMessage = `${chalk.bold.red(symbols.error)} ${message}`;

	stopLoader();
	console.log(fullMessage, error);
};
/**
 * Outputs a warning message to the console.
 *
 * @param message - Message to be outputted.
 */
const warning = (message: string): void => {
	const fullMessage = `${chalk.bold.yellow(symbols.warning)} ${message}`;

	if (loader.isSpinning) {
		stopLoader();
	}

	console.log(fullMessage);
};
/**
 * Outputs a success message to the console.
 *
 * @param message - Message to be outputted.
 */
const success = (message: string): void => {
	const fullMessage = `${chalk.bold.green(symbols.success)} ${message}`;

	if (loader.isSpinning) {
		stopLoader();
	}

	console.log(fullMessage);
};

export { error, info, startLoader, stopLoader, success, warning };
