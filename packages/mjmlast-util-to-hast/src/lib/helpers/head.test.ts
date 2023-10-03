import { head } from "./head";
import { toHtml } from "hast-util-to-html";

it("serializes to HTML", () => {
  expect(
    toHtml(head, { allowDangerousCharacters: true, allowDangerousHtml: true })
  ).toMatchInlineSnapshot(`
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
      <!--[if !mso]><noscript><xml><o:officedocumentsettings><o:allowpng></o:allowpng><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml></noscript><![endif]-->
      <!--[if lte mso 11]><style type="text/css">.mj-outlook-group-fix { width:100% !important; }</style><![endif]><style type="text/css">
              noinput.mj-menu-checkbox { display:block!important; max-height:none!important; visibility:visible!important; }
              @media only screen and (max-width:479px) {
                .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links { display:none!important; }
                .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-inline-links,
                .mj-menu-checkbox[type="checkbox"] ~ .mj-menu-trigger { display:block!important; max-width:none!important; max-height:none!important; font-size:inherit!important; }
                .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links > a { display:block!important; }
                .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-close { display:block!important; }
                .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-open { display:none!important; }
              }</style></head>-->
    </head>
  `);
});
