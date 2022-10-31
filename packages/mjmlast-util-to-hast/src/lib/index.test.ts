import { toHtml } from "hast-util-to-html";
import { toHast } from ".";

const mjmlAst = {
  attributes: {},
  children: [
    {
      attributes: {},
      children: [
        {
          attributes: {},
          children: [
            {
              attributes: {},
              children: [
                {
                  attributes: {
                    src: "/assets/img/logo-small.png",
                    width: "100px",
                  },
                  children: [],
                  content: undefined,
                  type: "mj-image",
                },
              ],
              content: undefined,
              type: "mj-column",
            },
          ],
          content: undefined,
          type: "mj-section",
        },
      ],
      content: undefined,
      type: "mj-body",
    },
  ],
  content: undefined,
  type: "mjml",
};

it("returns a hast that can `hast-util-from-html` can stringify", () => {
  const hast = toHast(mjmlAst);

  expect(toHtml((hast as any))).toMatchInlineSnapshot(`"<div><div style="background-color: undefined"><div style="background-color: undefined"><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="table" width="100%"><tbody><tr><td style="font-size:0px;word-break:break-word"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px"><tbody><tr><td style="width:-50px"><image height="auto" src="/assets/img/logo-small.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px" width="-50"></td></tr></tbody></table></td></tr></tbody></table></div></div></div></div>"`);
});
