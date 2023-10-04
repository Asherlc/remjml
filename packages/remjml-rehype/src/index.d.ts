import type { VFile } from "vfile";
import type { MjmlRoot } from "mjmlast";
import type { Options as ToHastOptions } from "mjmlast-util-to-hast";
import type { Root as HRoot } from "hast";
import type { Processor } from "unified";
type TransformBridge = (tree: MjmlRoot, file: VFile) => Promise<void>;
type TransformMutate = (tree: MjmlRoot, file: VFile) => HRoot;
export default function remjmlRehype(destination?: ToHastOptions | Processor | null | undefined, options?: ToHastOptions | null | undefined): TransformBridge | TransformMutate;
export {};
