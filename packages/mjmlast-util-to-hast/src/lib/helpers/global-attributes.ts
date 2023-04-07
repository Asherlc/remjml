import {
  MjAttributes,
  MjBody,
  MjmlComponent,
  MjmlNode,
  componentTypes,
} from "mjmlast";
import { visit } from "unist-util-visit";
import { TestFunctionPredicate } from "unist-util-is";
import { omit } from "lodash-es";

function isComponent(node: MjmlNode): node is MjmlComponent {
  return componentTypes.has(node.type);
}

function createTestFunction(
  mjAttributesChild: MjmlComponent
): TestFunctionPredicate<MjmlNode> {
  const testFn = (node: MjmlNode): boolean => {
    if (!isComponent(node)) {
      return false;
    }

    if (mjAttributesChild.type === "mj-class") {
      return (
        node.attributes?.["mj-class"] === mjAttributesChild?.attributes?.name
      );
    }

    return node.type === mjAttributesChild.type;
  };

  return testFn as TestFunctionPredicate<MjmlNode>;
}
// Could probably be speed optimized a lot
export function applyGlobalAttributes(
  mjAttributes: MjAttributes,
  body: MjBody
): void {
  mjAttributes.children.forEach((mjAttributesChild) => {
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
