// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../../types/units-css.d.ts" />
import type { Parts } from "units-css";

export interface IDirectionalCssProperty<ValueType> {
  left: ValueType | undefined;
  right: ValueType | undefined;
  top: ValueType | undefined;
  bottom: ValueType | undefined;
}

export type BorderValue = Parts | "none" | undefined;
export type PaddingValue = Parts | undefined;

export type Value = PaddingValue | BorderValue;

export interface ShorthandProperty<ValueType extends Value> {
  value(expandedValue: string | undefined, direction: string): ValueType;
}
