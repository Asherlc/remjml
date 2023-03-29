import mjmlJsonToRemjml from ".";

it("converts mjml json to remjml", () => {
  const mjml = {
    tagName: "mjml",
    attributes: {},
    children: [
      {
        tagName: "mj-body",
        attributes: {},
        children: [
          {
            tagName: "mj-section",
            attributes: {},
            children: [
              {
                tagName: "mj-column",
                attributes: {},
                children: [
                  {
                    tagName: "mj-image",
                    attributes: {
                      width: "100px",
                      src: "/assets/img/logo-small.png",
                    },
                  },
                  {
                    tagName: "mj-divider",
                    attributes: {
                      "border-color": "#F46E43",
                    },
                  },
                  {
                    tagName: "mj-text",
                    attributes: {
                      "font-size": "20px",
                      color: "#F45E43",
                      "font-family": "Helvetica",
                    },
                    content: "Hello World",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const remjml = mjmlJsonToRemjml(mjml);

  expect(remjml).toEqual({
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
                    type: "mj-image",
                  },
                  {
                    attributes: {
                      "border-color": "#F46E43",
                    },
                    type: "mj-divider",
                  },
                  {
                    attributes: {
                      color: "#F45E43",
                      "font-family": "Helvetica",
                      "font-size": "20px",
                    },
                    content: "Hello World",
                    type: "mj-text",
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
  });
});
