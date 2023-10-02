import { MjSection } from "mjmlast";
import { Attributes } from "../../helpers/Attributes";
import { ColumnContainerWidth } from "./ColumnContainerWidth";

it("computes the correct width", () => {
  const child1 = {};
  const child2 = {};

  const parent = {
    type: "mj-section",
    children: [child1, child2],
  } as MjSection;

  const attributes = new Attributes({}, {})

  const width = new ColumnContainerWidth("600px", parent, attributes);

  expect(width.toString()).toEqual("300px");
});
