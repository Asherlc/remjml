import type { EndComponent } from "./EndComponent";

export interface MjRaw extends EndComponent {
  attributes: { position: "enum(file-start)" };
  type: "mj-raw";
}
