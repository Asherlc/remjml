import "jest-xml-matcher";
import { unified } from "unified";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";
import remjmlParse from "remjml-parse";
import originalMjml from "mjml";
import "jest-html-match-prettier";

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
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible"
              content="IE=edge"
        >
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
        <!--[if lte mso 11]><style type="text/css">.mj-outlook-group-fix{ width:100% !important; }</style><![endif]-->
        <style type="text/css">
          @media only screen and (min-width:480px) {
          .mj-column-per-100 { width:100% !important; max-width: 100%; }
        }
        </style>
        <style media="screen and (min-width:480px)">
          .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
        </style>
        <style type="text/css">
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
                            <td align="center"
                                vertical-align="middle"
                                style="font-size:0px;padding:10px 25px;word-break:break-word"
                            >
                              <table border="0"
                                     cellpadding="0"
                                     cellspacing="0"
                                     role="presentation"
                                     style="border-collapse:separate;line-height:100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="center"
                                        bgcolor="#f45e43"
                                        role="presentation"
                                        style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#f45e43"
                                        valign="middle"
                                    >
                                      <p style="display:inline-block;background:#f45e43;color:white;font-family:Helvetica;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px">
                                        Don't click me!
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
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

describe("with no content", () => {
  it("outputs the same html as the original mjml library (xml compare)", async () => {
    const mjml = `<mjml>
  <mj-body>
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
  </mj-body>
</mjml>`;

    const ourHtml = (
      await unified()
        .use(remjmlParse)
        .use(remjmlRehype as any)
        .use(rehypeStringify, {
          allowDangerousHtml: true,
          closeSelfClosing: true,
          closeEmptyElements: true,
        })
        .process(mjml)
    ).value.toString();

    const theirHtml: string = originalMjml(mjml).html;

    await expect(ourHtml.toLowerCase()).toMatchHTML(theirHtml.toLowerCase(), {
      prettier: true,
    });
  });
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

  const ourHtml: string = (
    await unified()
      .use(remjmlParse)
      .use(remjmlRehype as any)
      .use(rehypeStringify, {
        allowDangerousHtml: true,
      })
      .process(mjml)
  ).value.toString();

  const theirHtml: string = originalMjml(mjml).html;

  await expect(ourHtml).toMatchHTML(theirHtml, { prettier: true });
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
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <title>
        </title>
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible"
              content="IE=edge"
        >
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
        <!--[if lte mso 11]><style type="text/css">.mj-outlook-group-fix{ width:100% !important; }</style><![endif]-->
        <style type="text/css">
          @media only screen and (min-width:480px) {
          .mj-column-per-100 { width:100% !important; max-width: 100%; }
        }
        </style>
        <style media="screen and (min-width:480px)">
          .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
        </style>
        <style type="text/css">
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
                                    <td style="width:600px">
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
                            <td align="left"
                                style="font-size:0px;padding:10px 25px;padding-top:50px;padding-right:25px;padding-bottom:30px;padding-left:25px;word-break:break-word"
                            >
                              <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:45px;font-weight:bold;letter-spacing:none;line-height:1;text-align:left;color:#ffffff">
                                Welcome aboard
                              </div>
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
                            <td align="left"
                                vertical-align="middle"
                                style="font-size:0px;padding:10px 25px;word-break:break-word"
                            >
                              <table border="0"
                                     cellpadding="0"
                                     cellspacing="0"
                                     role="presentation"
                                     style="border-collapse:separate;line-height:100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="center"
                                        bgcolor="#ffffff"
                                        role="presentation"
                                        style="border:none;border-radius:10px;cursor:auto;mso-padding-alt:10px 25px;background:#ffffff"
                                        valign="middle"
                                    >
                                      <p style="display:inline-block;background:#ffffff;color:#1AA0E1;font-family:open Sans Helvetica, Arial, sans-serif;font-size:22px;font-weight:bold;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:10px">
                                        Login
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
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
