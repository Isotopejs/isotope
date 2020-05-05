import * as Prototope from "@isotope/prototope";
import * as utils from "./utils";
import { Storage } from "./storage";

let prototope: string | null = null;
let isotope: string | null = null;

/**
 * Loads Isotope library.
 */
const loadIsotope = async (): Promise<string> => {
	if (!isotope) {
		const { code } = await utils.bundle({
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
};
/**
 * Loads Prototope mock library.
 */
const loadPrototopeMock = async (): Promise<string> => {
	if (!prototope) {
		const utilProperties = Object.keys(Prototope).map((utilName) => {
			return `${utilName}: mockFunction`;
		});
		const { code } = await utils.bundle({
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
};
/**
 * Loads required libraries.
 *
 * @param storage - Docking storage.
 * @returns - HTML string with required <script> tags.
 */
const loadLibraries = async (storage: Storage): Promise<string> => {
	const outputFolder = storage.getOutputFolder("assets");

	await utils.mkdirp(outputFolder);
	await utils.outputFile(utils.join(outputFolder, "isotope.js"), await loadIsotope());
	await utils.outputFile(
		utils.join(outputFolder, "prototope.js"),
		await loadPrototopeMock()
	);

	return `
	<script src="asset:isotope.js"></script>
	<script src="asset:prototope.js"></script>
	`;
};

export { loadLibraries };
