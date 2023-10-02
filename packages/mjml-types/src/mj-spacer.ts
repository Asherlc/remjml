import { Component } from "./component";

type Attributes = {
  border: string;
  "border-bottom": string;
  "border-left": string;
  "border-right": string;
  "border-top": string;
  "container-background-color": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  height: string;
};

export interface MjSpacer extends Component {
  attributes: Attributes;
  tagName: "mj-spacer";
}
