import { Child } from "./register";
declare module "../../node" {
    interface IsotopeNode {
        button: Child;
        datalist: Child;
        fieldset: Child;
        form: Child;
        input: Child;
        label: Child;
        legend: Child;
        meter: Child;
        optgroup: Child;
        option: Child;
        output: Child;
        progress: Child;
        select: Child;
        textarea: Child;
    }
}
