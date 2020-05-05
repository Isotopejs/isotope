import { RollupCache, rollup } from "rollup";
import rollupBabel from "@rollup/plugin-babel";
import rollupCommonJS from "@rollup/plugin-commonjs";
import rollupResolve from "@rollup/plugin-node-resolve";
import { terser as rollupTerser } from "rollup-plugin-terser";
import rollupVirtual from "@rollup/plugin-virtual";

interface BundleConfig {
	cache?: RollupCache;
	code?: string;
	path?: string;
	production?: boolean;
	name?: string;
	external?: { [id: string]: string };
}
interface BundleOutput {
	code: string;
	cache: RollupCache;
}

/**
 * Bundles the supplied input file.
 *
 * @param config - Bundling configuration.
 * @returns - Bundled code and cache.
 */
const bundle = async (config: BundleConfig): Promise<BundleOutput> => {
	const extensions = [".js", ".ts"];
	const bundler = await rollup({
		cache: config.cache,
		external: Object.keys(config.external || {}),
		input: config.path ? config.path : "virtualInputModule",
		onwarn: () => true,
		plugins: [
			...(config.code ? [rollupVirtual({ virtualInputModule: config.code })] : []),
			...(config.production ? [rollupTerser()] : []),
			rollupCommonJS(),
			rollupResolve({ extensions }),
			rollupBabel({
				extensions,
				plugins: ["@babel/plugin-transform-typescript"]
			})
		]
	});
	const { output } = await bundler.generate({
		format: config.name ? "umd" : "iife",
		globals: config.external,
		name: config.name
	});

	return {
		cache: bundler.cache,
		code: output[0].code
	};
};
/**
 * Hashes the specified string.
 *
 * @param str - String to be hashed.
 * @returns - Hashed string.
 */
const hash = (str: string): string => {
	const base = 31;
	const maxLength = 10;

	let hash = 0;

	for (let i = 0; i < str.length; i++) {
		hash = (Math.imul(base, hash) + str.charCodeAt(i)) | 0;
	}

	return `h${hash > 0 ? hash : -hash}`.slice(0, maxLength);
};

export { bundle, hash };
