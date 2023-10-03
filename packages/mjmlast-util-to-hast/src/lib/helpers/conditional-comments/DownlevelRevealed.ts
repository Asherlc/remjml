import { ConditionalComment } from "./ConditionalComment";

export class DownlevelRevealed extends ConditionalComment {
  protected get beginString(): string {
    return `<!--[if ${this.expression}]>`;
  }

  protected get endString(): string {
    return `<![endif]>`;
  }
}
