import { x } from "xastscript";
import { fromXast } from ".";

it("removes unnecessary root", () => {
  const mjmlNode = {
    ...x("mjml"),
    position: {
      end: {
        column: 1,
        line: 2,
        offset: 7,
      },
      start: {
        column: 7,
        line: 1,
        offset: 6,
      },
    },
  };

  const xast = x(null, mjmlNode);

  const mjmlast = fromXast(xast);

  expect(mjmlast).toEqual({
    type: "mjml",
    attributes: {},
    children: [],
    position: {
      end: {
        column: 1,
        line: 2,
        offset: 7,
      },
      start: {
        column: 7,
        line: 1,
        offset: 6,
      },
    },
  });
});
