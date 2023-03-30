#!/usr/bin/env ts-node
import { createRequire } from "node:module";
import { args } from "unified-args";
import { remjml } from "remjml";

const require = createRequire(import.meta.url);

const proc = require("remjml/package.json");
const cli = require("./package.json");

const extensions = ["mjml"];

args({
  processor: remjml,
  name: proc.name,
  description: cli.description,
  version: [
    proc.name + ": " + proc.version,
    cli.name + ": " + cli.version,
  ].join(", "),
  pluginPrefix: proc.name,
  packageField: proc.name + "Config",
  rcName: "." + proc.name + "rc",
  ignoreName: "." + proc.name + "ignore",
  extensions,
});
