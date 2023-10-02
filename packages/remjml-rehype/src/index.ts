import type { VFile, Compatible } from "vfile";
import type { MjmlRoot } from "mjmlast";
import type { Options as ToHastOptions } from "mjmlast-util-to-hast";
import { toHast } from "mjmlast-util-to-hast";
import type { Root as HRoot } from "hast";
import type { Processor } from "unified";

//   Bridge-mode.
//
//   Runs the destination with the new hast tree.
//   Discards result.
type TransformBridge = (tree: MjmlRoot, file: VFile) => Promise<void>;

// Mutate-mode.
type TransformMutate = (tree: MjmlRoot, file: VFile) => HRoot;

export default function remjmlRehype(
  destination?: ToHastOptions | Processor | null | undefined,
  options?: ToHastOptions | null | undefined
): TransformBridge | TransformMutate {
  if (destination && "run" in destination) {
    const transformBridge: TransformBridge = async function (
      tree: MjmlRoot,
      file: Compatible
    ) {
      // Cast because root in -> root out.
      const hastTree: HRoot = toHast(tree, options) as HRoot;

      await destination.run(hastTree, file);
    };

    return transformBridge;
  }

  const transformMutate: TransformMutate = function (tree: MjmlRoot): HRoot {
    // Cast because root in -> root out.
    return toHast(tree, options || destination) as HRoot;
  };

  return transformMutate;
}
