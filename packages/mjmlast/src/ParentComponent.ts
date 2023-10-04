import type { Parent as UnistParent } from "unist";
import type { Component } from "./Component";

export interface ParentComponent extends Component, UnistParent {}
