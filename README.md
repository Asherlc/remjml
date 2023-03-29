# remjml

A collection of packages designed to facilitate parsing [mjml](https://mjml.io/) into a [unified](https://unifiedjs.com/) compatible AST.

Once an AST has been generated, we can use the [mjml-util-to-hast](packages/mjmlast-util-to-hast/README.md) package to convert the AST into an html-ast, which can be stringified into HTML. Alternatively, one can use the many unified ecosystem packages to further process the data.
