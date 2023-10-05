import type { MjImage } from "mjmlast";
import { mjImage } from "./mj-image";
import type { Element as HElement } from "hast";

it("computes the correct width based on a set width", () => {
  const image: MjImage = {
    attributes: {
      width: "50px",
    },
    type: "mj-image",
  };

  const hast = mjImage(
    image,
    {
      type: "mj-column",
      children: [],
      attributes: {},
    },
    {},
    {
      mjHead: {
        type: "mj-head",
        children: [],
      },
      mediaQueries: {},
      containerWidth: "600px",
      navbarBaseUrl: undefined,
      mjClassesAttributes: {},
      mjAllAttributes: {},
    }
  );

  const td = ((hast.children[0] as HElement).children[0] as HElement)
    .children[0] as HElement;

  expect(td.properties?.style).toEqual("width:50px");
});
