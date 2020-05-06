"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const symbols = __importStar(require("log-symbols"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const loader = ora_1.default();
/**
 * Starts terminal-based loader.
 *
 * @param message - Loader's message.
 */
const startLoader = (message) => {
    loader.start(message);
};
exports.startLoader = startLoader;
/**
 * Stops terminal-based loader.
 */
const stopLoader = () => {
    loader.stop();
};
exports.stopLoader = stopLoader;
/**
 * Outputs a message to the console.
 *
 * @param message - Message to be outputted.
 */
const info = (message) => {
    const fullMessage = `${chalk_1.default.bold.blue(symbols.info)} ${message}`;
    if (loader.isSpinning) {
        stopLoader();
    }
    console.log(fullMessage);
};
exports.info = info;
/**
 * Outputs an error message to the console.
 *
 * @param message - Message to be outputted.
 * @param error - Error object.
 */
const error = (message, error) => {
    const fullMessage = `${chalk_1.default.bold.red(symbols.error)} ${message}`;
    stopLoader();
    console.log(fullMessage, error.message);
};
exports.error = error;
/**
 * Outputs a warning message to the console.
 *
 * @param message - Message to be outputted.
 */
const warning = (message) => {
    const fullMessage = `${chalk_1.default.bold.yellow(symbols.warning)} ${message}`;
    if (loader.isSpinning) {
        stopLoader();
    }
    console.log(fullMessage);
};
exports.warning = warning;
/**
 * Outputs a success message to the console.
 *
 * @param message - Message to be outputted.
 */
const success = (message) => {
    const fullMessage = `${chalk_1.default.bold.green(symbols.success)} ${message}`;
    if (loader.isSpinning) {
        stopLoader();
    }
    console.log(fullMessage);
};
exports.success = success;
//# sourceMappingURL=logger.js.map