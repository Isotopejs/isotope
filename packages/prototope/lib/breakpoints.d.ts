import { PrototopeContext, Util } from "./declarations";
import { IsotopeNode } from "@isotope/core";
declare const sm: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const md: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const lg: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const xl: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
export { sm, md, lg, xl };
