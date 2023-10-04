#!/usr/bin/env ts-node --esm --experimentalSpecifierResolution node
import { args } from "unified-args";
import { remjml } from "remjml";
const proc = {
    name: "mjml",
    version: "*",
};
const cli = {
    name: "remjml-cli",
    description: "",
    version: "*",
};
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
