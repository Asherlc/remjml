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
        <title>
        </title>
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
        <style type="text/css">
          noinput.mj-menu-checkbox { display:block!important; max-height:none!important; visibility:visible!important; }
                @media only screen and (max-width:479px) {
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links { display:none!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-inline-links,
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-menu-trigger { display:block!important; max-width:none!important; max-height:none!important; font-size:inherit!important; }
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links > a { display:block!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-close { display:block!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-open { display:none!important; }
                }
        </style>
      </head>
      <body style="word-spacing:normal">
        <div style>
          <div style="margin:0px auto;max-width:600px">
            <table align="center"
                   border="0"
                   cellpadding="0"
                   cellspacing="0"
                   role="presentation"
                   style="width:100%"
            >
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
                    <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix"
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

it("outputs the same html as the original mjml library (prettier compare)", async () => {
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

it("transforms mjml to html", async () => {
  const mjml = `<mjml>
  <mj-body background-color="#ffffff" font-size="13px">
    <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
      <mj-column vertical-align="top" width="100%">
        <mj-image
          src="http://go.mailjet.com/tplimg/mtrq/b/ox8s/mg1rw.png"
          alt=""
          align="center"
          border="none"
          width="600px"
          padding-left="0px"
          padding-right="0px"
          padding-bottom="0px"
          padding-top="0"
        ></mj-image>
      </mj-column>
    </mj-section>
    <mj-section
      background-color="#009FE3"
      vertical-align="top"
      padding-bottom="0px"
      padding-top="0"
    >
      <mj-column vertical-align="top" width="100%">
        <mj-text
          align="left"
          color="#ffffff"
          font-size="45px"
          font-weight="bold"
          font-family="open Sans Helvetica, Arial, sans-serif"
          padding-left="25px"
          padding-right="25px"
          padding-bottom="30px"
          padding-top="50px"
          >Welcome aboard</mj-text
        >
      </mj-column>
    </mj-section>
    <mj-section
      background-color="#009fe3"
      padding-bottom="20px"
      padding-top="20px"
    >
      <mj-column vertical-align="middle" width="100%">
        <mj-text
          align="left"
          color="#ffffff"
          font-size="22px"
          font-family="open Sans Helvetica, Arial, sans-serif"
          padding-left="25px"
          padding-right="25px"
          ><span style="color: #feeb35">Dear [[FirstName]]</span><br /><br />
          Welcome to [[CompanyName]].</mj-text
        >
        <mj-text
          align="left"
          color="#ffffff"
          font-size="15px"
          font-family="open Sans Helvetica, Arial, sans-serif"
          padding-left="25px"
          padding-right="25px"
          >We&apos;re really excited you&apos;ve decided to give us a try. In
          case you have any questions, feel free to reach out to us at
          [[ContactEmail]]. You can login to your account with your username
          [[UserName]]</mj-text
        >
        <mj-button
          align="left"
          font-size="22px"
          font-weight="bold"
          background-color="#ffffff"
          border-radius="10px"
          color="#1AA0E1"
          font-family="open Sans Helvetica, Arial, sans-serif"
          >Login</mj-button
        >
        <mj-text
          align="left"
          color="#ffffff"
          font-size="15px"
          font-family="open Sans Helvetica, Arial, sans-serif"
          padding-left="25px"
          padding-right="25px"
          >Thanks, <br />
          The [[CompanyName]] Team</mj-text
        >
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

  const html = await unified()
    .use(remjmlParse)
    .use(remjmlRehype as any)
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(mjml);

  expect(String(html)).toMatchInlineSnapshot(`
    <div>
      <!doctype html>
      <html xmlns="http://www.w3.org/1999/xhtml"
            xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office"
      >
        <head>
          <title>
          </title>
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
          <style type="text/css">
            noinput.mj-menu-checkbox { display:block!important; max-height:none!important; visibility:visible!important; }
                @media only screen and (max-width:479px) {
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links { display:none!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-inline-links,
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-menu-trigger { display:block!important; max-width:none!important; max-height:none!important; font-size:inherit!important; }
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links > a { display:block!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-close { display:block!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-open { display:none!important; }
                }
          </style>
        </head>
        <body style="word-spacing:normal;background-color:#ffffff">
          <div style="background-color:#ffffff">
            <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px">
              <table align="center"
                     border="0"
                     cellpadding="0"
                     cellspacing="0"
                     role="presentation"
                     style="background:#ffffff;background-color:#ffffff;width:100%"
              >
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0;text-align:center">
                      <div class="mj-column-per-100 mj-outlook-group-fix"
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
                              <td align="center"
                                  style="font-size:0px;padding:10px 25px;padding-top:0;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word"
                              >
                                <table border="0"
                                       cellpadding="0"
                                       cellspacing="0"
                                       role="presentation"
                                       style="border-collapse:collapse;border-spacing:0px"
                                >
                                  <tbody>
                                    <tr>
                                      <td style="width:[object Object]px">
                                        <image alt
                                               height="auto"
                                               src="http://go.mailjet.com/tplimg/mtrq/b/ox8s/mg1rw.png"
                                               style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px"
                                               width="100%"
                                        >
                                        </image>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:0px;word-break:break-word">
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="background:#009FE3;background-color:#009FE3;margin:0px auto;max-width:600px">
              <table align="center"
                     border="0"
                     cellpadding="0"
                     cellspacing="0"
                     role="presentation"
                     style="background:#009FE3;background-color:#009FE3;width:100%"
              >
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0;text-align:center">
                      <div class="mj-column-per-100 mj-outlook-group-fix"
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
                              <td align="left"
                                  style="font-size:0px;padding:10px 25px;padding-top:50px;padding-right:25px;padding-bottom:30px;padding-left:25px;word-break:break-word"
                              >
                                <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:45px;font-weight:bold;letter-spacing:none;line-height:1;text-align:left;color:#ffffff">
                                  Welcome aboard
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="background:#009fe3;background-color:#009fe3;margin:0px auto;max-width:600px">
              <table align="center"
                     border="0"
                     cellpadding="0"
                     cellspacing="0"
                     role="presentation"
                     style="background:#009fe3;background-color:#009fe3;width:100%"
              >
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center">
                      <div class="mj-column-per-100 mj-outlook-group-fix"
                           style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%"
                      >
                        <table border="0"
                               cellpadding="0"
                               cellspacing="0"
                               role="presentation"
                               style="vertical-align:middle"
                               width="100%"
                        >
                          <tbody>
                            <tr>
                              <td style="font-size:0px;word-break:break-word">
                              </td>
                            </tr>
                            <tr>
                              <td align="left"
                                  style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word"
                              >
                                <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:22px;letter-spacing:none;line-height:1;text-align:left;color:#ffffff">
                                  <span style="color: #feeb35">
                                    Dear [[FirstName]]
                                  </span>
                                  <br>
                                  <br>
                                  Welcome to [[CompanyName]].
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:0px;word-break:break-word">
                              </td>
                            </tr>
                            <tr>
                              <td align="left"
                                  style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word"
                              >
                                <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:15px;letter-spacing:none;line-height:1;text-align:left;color:#ffffff">
                                  We're really excited you've decided to give us a try. In
              case you have any questions, feel free to reach out to us at
              [[ContactEmail]]. You can login to your account with your username
              [[UserName]]
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:0px;word-break:break-word">
                              </td>
                            </tr>
                            <tr>
                              <td align="left"
                                  style="font-size:0px;word-break:break-word"
                              >
                                <div>
                                  Login
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:0px;word-break:break-word">
                              </td>
                            </tr>
                            <tr>
                              <td align="left"
                                  style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word"
                              >
                                <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:15px;letter-spacing:none;line-height:1;text-align:left;color:#ffffff">
                                  Thanks,
                                  <br>
                                  The [[CompanyName]] Team
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </body>
      </html>
    </div>
  `);
});
