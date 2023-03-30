import { MjImage } from "mjmlast";
import { mjImage } from "./mj-image";

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
    },
    {},
    {
      mjHead: {
        type: "mj-head",
        children: [],
      },
      mediaQueries: {},
      cssClasses: {},
      containerWidth: "600px",
    }
  );

  const td = hast.children[0].children[0].children[0];

  expect(td.properties.style).toEqual("width:50px");
});
