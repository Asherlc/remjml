import type { Node } from "unist";
import type { MjAttributes, MjBody } from "mjmlast";
import { isBodyComponent, isComponent, isMjClass } from "mjmlast";
import { visit } from "unist-util-visit";
import type { TestFunction } from "unist-util-is";
import { omit } from "lodash-es";

function createTestFunction(mjAttributesChild: Node): TestFunction {
  const testFn: TestFunction = (node: Node): boolean => {
    if (!isComponent(node)) {
      return false;
    }

    if (isBodyComponent(node) && isMjClass(mjAttributesChild)) {
      return (
        node.attributes["mj-class"] === mjAttributesChild?.attributes?.name
      );
    }

    return node.type === mjAttributesChild.type;
  };

  return testFn as TestFunction;
}

// Could probably be speed optimized a lot
export function applyGlobalAttributes(
  mjAttributes: MjAttributes,
  body: MjBody
): void {
  mjAttributes.children.forEach((mjAttributesChild) => {
    if (!isComponent(mjAttributesChild)) {
      return;
    }

    const test = createTestFunction(mjAttributesChild);
    const attributesToApply = omit(mjAttributesChild.attributes, "mj-class");

    visit(body, test, (node): void => {
      if (!isComponent(node)) {
        return;
      }

      const attributes = {
        ...attributesToApply,
        ...node.attributes,
      };
      node.attributes = attributes;
    });
  });
}
