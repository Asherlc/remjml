import type { MjSection } from "mjmlast";
import { Attributes } from "../../helpers/attributes/Attributes";
import { ColumnContainerWidth } from "./ColumnContainerWidth";
import type { Node } from "unist";

it("computes the correct width", () => {
  const child1: Node = { type: "element" };
  const child2: Node = { type: "element" };

  const parent = {
    type: "mj-section",
    children: [child1, child2],
  } as MjSection;

  const attributes = new Attributes({
    attributes: {},
    defaultAttributes: {},
    mjClass: undefined,
    mjClassesAttributes: {},
  });

  const width = new ColumnContainerWidth("600px", parent, attributes);

  expect(width.toString()).toEqual("300px");
});
