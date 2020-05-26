import { PrototopeContext, Util } from "./declarations";
import { IsotopeNode } from "@isotope/core";
/**
 * Creates Prototope sub-selector directive.
 *
 * @param subSelector - CSS sub-selector.
 * @returns - Isotope directive.
 */
declare const createSubSelector: (subSelector: string) => (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const first: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const last: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const after: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const before: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const odd: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const even: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const hover: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const focus: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const active: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const visited: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const disabled: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
declare const placeholder: (utils: Util | Util[]) => (node: IsotopeNode<any, PrototopeContext>) => void;
export { createSubSelector, first, last, after, before, odd, even, hover, focus, active, visited, disabled, placeholder };
