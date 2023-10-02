import sharedConfig from "../../jest.config.base.js";
import { join, parse } from 'path'
  

/** @type {import('jest').Config} */
export default {
  ...sharedConfig,
  https://jestjs.io/docs/configuration/#prettierpath-string
  prettierPath: new URL(import.meta.resolve('prettier-2')).pathname
};
