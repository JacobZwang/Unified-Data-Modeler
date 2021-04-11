import type { Parameter } from "../../models/parameter";
import { syntaxTree, Languages, flatSyntax, DataType } from "../syntax_tree";
import type from "./type_finder";
import warning from "./warning";

export default (name: string, parameters: Array<Parameter>): string => {
  return (
    warning +
    +"\n"
    +`
    // Add these lines to the [dependencies] section of your cargo.toml:
    // serde = { version = "1.0", features = ["derive"] }
    // serde_json = "1.0"

    use serde::{Serialize, Deserialize};
    #[derive(Serialize, Deserialize, Debug)]
    `+
    "\nstruct " +
    name +
    " {\n" +
    parameters
      .map((value) => {
        return "    " + name + ": " +(value.required?"":"Option<")+ type(value.type, Languages.Rust)+(value.required?"":">");
      })
      .join(",\n") +
    "\n}"
  );
};
