import { IsotopeNode } from "@isotope/core";
declare type ComponentFunction = (page: string, content?: string, parse?: (content: string) => (node: IsotopeNode) => void) => (parent: IsotopeNode) => IsotopeNode;
export { ComponentFunction };
