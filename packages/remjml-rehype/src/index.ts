import type { MjmlNode } from "mjmlast";
import type { Processor, RunCallback } from "unified";
import { toHast } from "mjmlast-util-to-hast";
import { Compatible, Data } from "vfile";
import type { Node } from "unist";
import { Options } from "mjmlast-util-to-hast/src/lib";

export default function remjmlRehype(
  destination: Processor,
  options: Options = {}
) {
  return destination && "run" in destination
    ? bridge(destination, options)
    : mutate(options);
}

/**
 * Bridge-mode.
 * Runs the destination with the new hast tree.
 *
 */
function bridge(destination: Processor, options?: Options) {
  return (node: MjmlNode, file: Compatible, next: RunCallback<Node<Data>>) => {
    const hast = toHast(node, options);

    destination.run(hast, file, (error) => {
      next(error);
    });
  };
}

/**
 * Mutate-mode.
 * Further plugins run on the hast tree.
 *
 */
function mutate(options: Options) {
  return (node: MjmlNode) => {
    const hast = toHast(node, options);
    return hast;
  };
}
