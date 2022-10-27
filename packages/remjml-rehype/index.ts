import type { ElementContent } from "hast";
import type { MjmlAstNode } from "mjmlast";
import type { Processor, Plugin } from "unified";

type Options = {};

function toHast(node: MjmlAstNode, options: Options): ElementContent {
  return {
    tagName: 
  }
}

export default function remjmlRehype(destination: Processor, options: Options) {
  return destination && "run" in destination
    ? bridge(destination, options)
    : mutate(destination || options);
}

/**
 * Bridge-mode.
 * Runs the destination with the new hast tree.
 *
 */
function bridge(destination: Processor, options: Options) {
  return (node, file, next) => {
    destination.run(toHast(node, options), file, (error) => {
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
  return (node) => toHast(node, options);
}
