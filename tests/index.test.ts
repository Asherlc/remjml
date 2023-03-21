import "jest-xml-matcher";

import { unified } from "unified";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";
import remjmlParse from "remjml-parse";
import originalMjml from "mjml";
import prettier from "prettier";

it("transforms mjml to html", async () => {
  const mjml = `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-button font-family="Helvetica" background-color="#f45e43" color="white">
          Don't click me!
         </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

  const html = await unified()
    .use(remjmlParse)
    .use(remjmlRehype as any)
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(mjml);

  expect(String(html)).toMatchInlineSnapshot(`
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <!--[if mso]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->
        <meta http-equiv="Content-Type"
              content="text/html; charset=UTF-8"
        >
        <meta name="viewport"
              content="width=device-width, initial-scale=1"
        >
        <style type="text/css">
          #outlook a { padding:0; }
    body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
    table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
    img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
    p { display:block;margin:13px 0; }
        </style>
        <!--[if mso]><noscript><xml><o:officedocumentsettings><o:allowpng></o:allowpng><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml></noscript><![endif]-->
        <!--[if lte mso 11]><style type="text/css">.mj-outlook-group-fix { width:100% !important; }</style><![endif]-->
      </head>
      <body style="word-spacing:normal">
        <div style>
          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly"><div style="margin:0px auto;max-width:600px"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
          <div class="mj-column-per-33 mj-outlook-group-fix"
               style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%"
          >
            <table border="0"
                   cellpadding="0"
                   cellspacing="0"
                   role="presentation"
                   style="vertical-align:top"
                   width="100%"
            >
              <tbody>
                <tr>
                  <td style="font-size:0px;word-break:break-word">
                  </td>
                </tr>
                <tr>
                  <td style="font-size:0px;word-break:break-word">
                    <div>
                      Don't click me!
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:0px;word-break:break-word">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]-->
        </div>
      </body>
    </html>
  `);
});

it("outputs the same html as the original mjml library (xml compare)", async () => {
  const mjml = `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-button font-family="Helvetica" background-color="#f45e43" color="white">
          Don't click me!
         </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

  const ourHtml = (
    await unified()
      .use(remjmlParse)
      .use(remjmlRehype as any)
      .use(rehypeStringify, {
        allowDangerousHtml: true,
      })
      .process(mjml)
  ).value;

  const theirHtml = originalMjml(mjml).html;

  expect(ourHtml).toEqualXML(theirHtml);
});

fit("outputs the same html as the original mjml library (prettier compare)", async () => {
  const mjml = `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-button font-family="Helvetica" background-color="#f45e43" color="white">
          Don't click me!
         </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

  const ourHtml = (
    await unified()
      .use(remjmlParse)
      .use(remjmlRehype as any)
      .use(rehypeStringify, {
        allowDangerousHtml: true,
      })
      .process(mjml)
  ).value;

  const theirHtml = originalMjml(mjml).html;

  expect(prettier.format(ourHtml.toString(), { parser: "html" })).toEqualXML(
    prettier.format(theirHtml, { parser: "html" })
  );
});
