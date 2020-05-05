declare function getDockingAsset(path: string): string;
declare function getDockingConfig<V = string>(accessKey: string): V;
declare module "eval" {
	export default function eval<T>(code: string, globals?: boolean): T;
}
declare module "@rollup/plugin-babel" {
	import { Plugin } from "rollup";

	export default function babel(config: object): Plugin;
}
declare module "@rollup/plugin-virtual" {
	import { Plugin } from "rollup";

	export default function virtual(modules: { [module: string]: string }): Plugin;
}
