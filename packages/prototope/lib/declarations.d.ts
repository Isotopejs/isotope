import { IsotopeNode } from "@isotope/core";
import { Properties } from "csstype";
interface Breakpoints<T> {
    sm: T;
    md: T;
    lg: T;
    xl: T;
}
interface Colors {
    dark: string;
    darker: string;
    light: string;
    lighter: string;
    primary: string;
    secondary: string;
}
interface Config {
    breakpoints: Breakpoints<number>;
    colors: Colors;
}
interface Context {
    prototope: Data;
}
interface CurrentData {
    breakpoint?: keyof Breakpoints<any> | null;
    selector?: string | null;
    className?: string | null;
}
interface Data {
    data: CurrentData;
    registry: PrototopeRegistry;
    config: Config;
}
interface PartialConfig {
    breakpoints?: Partial<Breakpoints<number>>;
    colors?: Partial<Colors>;
}
interface PrototopeRegistry {
    addBreakpoint(breakpoint: keyof Breakpoints<any>): void;
    addRule(properties: Properties<string>, config: CurrentData): string;
    getCSS(): string;
    getRule(data: CurrentData): Properties<string> | null;
}
declare type Util = (node: IsotopeNode<any, Context>) => void;
export { Breakpoints, Colors, Config, Context, CurrentData, Data, PartialConfig, PrototopeRegistry, Util };
