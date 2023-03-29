import { VFileMessage, Point } from "vfile-message";
import { location } from "vfile-location";
import {
  parseXml,
  XmlDocument,
  XmlElement,
  XmlError,
  XmlNode,
  XmlText,
} from "@rgrove/parse-xml";

import { MjmlNode, nodeTypes, Text } from "mjmlast";

type State = {
  location: ReturnType<typeof location>;
};

type Content = MjmlNode | Text;

function transformElement(node: XmlElement, state: State): Content {
  const children = transformChildren(node.children, state);

  if (nodeTypes.has(node.name)) {
    return {
      type: node.name,
      attributes: { ...node.attributes },
      children,
    };
  }

  return {
    type: "element",
    tagName: node.name,
    properties: node.attributes,
    children,
  };
}

function transformText(node: XmlText): Content {
  return { type: "text", value: node.text };
}

function transformChildren(children: XmlNode[], state: State) {
  const results: Content[] = [];
  let index = -1;

  while (++index < children.length) {
    const from = children[index];
    let to: Content | undefined;

    if (from.type === "element") {
      to = transformElement(from as XmlElement, state);
    } else if (from.type === "text") {
      to = transformText(from as XmlText);
    }

    if (to) {
      patch(from, to, state);
      results.push(to);
    }
  }

  return results;
}

export function fromMjml(mjml: string): MjmlNode {
  const loc = location(mjml);
  let xmlDocument: XmlDocument;

  try {
    xmlDocument = parseXml(String(mjml), {
      // Positional offsets.
      includeOffsets: true,
      ignoreUndefinedEntities: true,
    });
  } catch (error) {
    if (error instanceof XmlError) {
      const point: Point = loc.toPoint(error.pos);
      throw new VFileMessage(
        error.message,
        point,
        "mjmlast-util-from-mjml:error"
      );
    }

    throw error;
  }

  const state = { location: loc };
  const root = transformElement(xmlDocument.children[0] as XmlElement, state);
  return root;
}

function patch(from: XmlNode, to: MjmlNode, state: State): void {
  const start =
    // Doesn’t practically happen as far as I found, but `-1` is used in the
    // code, so let’s keep it in.
    from.start === -1 ? undefined : state.location.toPoint(from.start);
  const end =
    // Same as above
    from.end === -1 ? undefined : state.location.toPoint(from.end);

  if (start && end) {
    to.position = { start, end };
  }
}
