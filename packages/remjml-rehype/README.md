# remjml-rehype

Convert mjml json directly to hast, when used in the unified ecosystem

## Example

```javascript
  const html = await unified()
    .use(remjmlParse)
    .use(remjmlRehype)
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(mjml);
```