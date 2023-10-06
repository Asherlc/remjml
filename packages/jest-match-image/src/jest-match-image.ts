import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { kebabCase } from "lodash-es";
import sharp from "sharp";
import fsPromise from "node:fs/promises";

async function toMatchImage(
  this: jest.MatcherContext,
  receivedImage: Buffer | Uint8Array | Uint8ClampedArray,
  expectedImage: Buffer | Uint8Array | Uint8ClampedArray,
  limit: number = 0
) {
  const receivedSharp = sharp(receivedImage);
  const expectedSharp = sharp(expectedImage);
  const receivedMetada = await receivedSharp.metadata();
  const expectedMetadata = await expectedSharp.metadata();
  const maximumWidth = Math.max(
    receivedMetada.width || 0,
    expectedMetadata.width || 0
  );
  const maximumHeight = Math.max(
    receivedMetada.height || 0,
    expectedMetadata.height || 0
  );

  // derive a new version "boxedBuffer1" of "img1.png", conceptually placing "img1.png" in the upper-left corner of a bounding box canvas
  const receivedBoxedBuffer = await receivedSharp
    .resize({
      width: maximumWidth,
      height: maximumHeight,
      fit: "contain", // instead of cropping or stretching, use "(letter/pillar/window)-boxing" (black space) to fill any excess space
      position: "left top", // arrange the original image in the upper-left corner
    })
    .raw()
    .toBuffer();

  const expectedBoxedBuffer = await expectedSharp
    .resize({
      width: maximumWidth,
      height: maximumHeight,
      fit: "contain",
      position: "left top",
    })
    .raw()
    .toBuffer();

  const diff = new PNG({
    width: maximumWidth,
    height: maximumHeight,
  });

  const numDiffPixels = pixelmatch(
    receivedBoxedBuffer,
    expectedBoxedBuffer,
    diff.data,
    maximumWidth,
    maximumHeight
  );

  const fileName = `${kebabCase(expect.getState().currentTestName)}.png`;
  const filePath = `./tmp/${fileName}`;
  await fsPromise.writeFile(filePath, PNG.sync.write(diff));

  const pass = numDiffPixels <= limit;

  const messageBuilder = () =>
    `expected ${this.utils.printReceived(
      numDiffPixels
    )} to be less than ${this.utils.printExpected(
      limit
    )}, diff saved at "${filePath}"`;

  if (pass) {
    return {
      message: messageBuilder,
      pass: true,
    };
  } else {
    return {
      message: messageBuilder,
      pass: false,
    };
  }
}

expect.extend({ toMatchImage });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchImage(
        expectedImage: Buffer | Uint8Array | Uint8ClampedArray,
        limit?: number
      ): Promise<R>;
    }
    interface ExpectExtendMap {
      toMatchImage?: CustomMatcher;
    }
  }
}
