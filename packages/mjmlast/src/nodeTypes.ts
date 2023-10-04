import { componentTypes } from "./componentTypes";

export const nodeTypes = new Set([...Array.from(componentTypes), "text"]);
