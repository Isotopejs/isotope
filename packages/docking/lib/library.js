"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Prototope = __importStar(require("@isotope/prototope"));
const utils = __importStar(require("./utils"));
let prototope = null;
let isotope = null;
/**
 * Loads Isotope library.
 */
const loadIsotope = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!isotope) {
        const { code } = yield utils.bundle({
            code: `
			import {createDOMView} from "@isotope/core";

			export {createDOMView}
		`,
            name: "Isotope",
            production: true
        });
        isotope = code;
    }
    return isotope;
});
/**
 * Loads Prototope mock library.
 */
const loadPrototopeMock = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!prototope) {
        const utilProperties = Object.keys(Prototope).map((utilName) => {
            return `${utilName}: mockFunction`;
        });
        const { code } = yield utils.bundle({
            // prettier
            code: `
            const mockFunction = () => mockFunction;
            const prototopeMock = {
                ${utilProperties.join(",")}
            };

            export default prototopeMock;
        `,
            name: "Prototope",
            production: true
        });
        prototope = code;
    }
    return prototope;
});
/**
 * Loads required libraries.
 *
 * @param storage - Docking storage.
 * @returns - HTML string with required <script> tags.
 */
const loadLibraries = (storage) => __awaiter(void 0, void 0, void 0, function* () {
    const outputFolder = storage.getOutputFolder("assets");
    yield utils.mkdirp(outputFolder);
    yield utils.writeFile(utils.join(outputFolder, "isotope.js"), yield loadIsotope());
    yield utils.writeFile(utils.join(outputFolder, "prototope.js"), yield loadPrototopeMock());
    return `
	<script src="asset:isotope.js"></script>
	<script src="asset:prototope.js"></script>
	`;
});
exports.loadLibraries = loadLibraries;
//# sourceMappingURL=library.js.map