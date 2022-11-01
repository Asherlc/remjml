declare module "unist-util-find" {
  import type { Node } from "unist";

  function find<N = Node>(tree: Node, selector: string): N | undefined;

  export default find;
}
