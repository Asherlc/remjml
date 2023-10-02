import { Component } from "./component";

export interface MjFont extends Component {
  attributes: {
    name: string;
    href: string;
  };
  tagName: "mj-font";
}
