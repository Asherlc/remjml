import { EndComponent } from "./EndComponent";

export interface MjRaw extends EndComponent {
  attributes: { position?: "file-start" };
  tagName: "mj-raw";
}
