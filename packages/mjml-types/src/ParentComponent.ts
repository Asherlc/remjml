import { Component } from "./component";

export interface ParentComponent extends Component {
  children: Component[];
}
