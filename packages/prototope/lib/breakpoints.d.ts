import { Context, Util } from "./declarations";
import { IsotopeNode } from "@isotope/core";
declare const sm: (utils: Util | Util[]) => (node: IsotopeNode<any, Context>) => void;
declare const md: (utils: Util | Util[]) => (node: IsotopeNode<any, Context>) => void;
declare const lg: (utils: Util | Util[]) => (node: IsotopeNode<any, Context>) => void;
declare const xl: (utils: Util | Util[]) => (node: IsotopeNode<any, Context>) => void;
export { sm, md, lg, xl };
