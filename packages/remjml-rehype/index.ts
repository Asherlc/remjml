import type { Parent, End } from "mjmlast";
import type { Processor } from "unified";
import { toHast } from "mjmlast-util-to-hast";

type MjmlAstNode = Parent | End;

type Options = {};

export default function remjmlRehype(
  destination: Processor,
  options?: Options
) {
  return destination && "run" in destination
    ? bridge(destination, options)
    : mutate(destination || options);
}

/**
 * Bridge-mode.
 * Runs the destination with the new hast tree.
 *
 */
function bridge(destination: Processor, options?: Options) {
  return (node, file, next) => {
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
  return (node) => toHast(node, options);
}
