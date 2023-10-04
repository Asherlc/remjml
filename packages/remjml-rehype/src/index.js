import { toHast } from "mjmlast-util-to-hast";
export default function remjmlRehype(destination, options) {
    if (destination && "run" in destination) {
        const transformBridge = async function (tree, file) {
            // Cast because root in -> root out.
            const hastTree = toHast(tree, options);
            await destination.run(hastTree, file);
        };
        return transformBridge;
    }
    const transformMutate = function (tree) {
        // Cast because root in -> root out.
        return toHast(tree, options || destination);
    };
    return transformMutate;
}
