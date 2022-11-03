import { toHtml } from "hast-util-to-html";
import { MjmlRoot } from "mjmlast";
import { toHast } from ".";

const mjmlAst: MjmlRoot = {
  children: [
    {
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
                  type: "mj-image",
                },
              ],
              type: "mj-column",
            },
          ],
          type: "mj-section",
        },
      ],
      type: "mj-body",
    },
  ],
  type: "mjml",
};

it("returns a hast that can `hast-util-from-html` can stringify", () => {
  const hast = toHast(mjmlAst);

  expect(toHtml(hast as any)).toMatchInlineSnapshot(
    `"<div><body style="word-spacing:normal"><div style=""><raw>&#x3C;!--[if mso | IE]></raw><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly"><div style="margin:0px auto;max-width:600px"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center"><raw>&#x3C;!--[if mso | IE]></raw><table role="presentation" border="0" cellpadding="0" cellspacing="0"><raw>&#x3C;![endif]--></raw><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%"><tbody><tr><td style="font-size:0px;word-break:break-word"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="min-width:100%;max-width:100%;border-collapse:collapse;border-spacing:0px"><tbody><tr><td><image height="auto" src="/assets/img/logo-small.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px" width="100"></td></tr></tbody></table></td></tr></tbody></table></div><raw>&#x3C;!--[if mso | IE]></raw></table></td></tr></tbody></table></div><raw>&#x3C;!--[if mso | IE]></raw></td></tr></table><raw>&#x3C;![endif]--></raw></div></body></div>"`
  );
});
