declare module "inline-style-parser" {
  import type { Declaration } from "css";

  export default function parse(css: string): Declaration[];
}
