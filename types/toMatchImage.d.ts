declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImage(
        theirImageData?: Buffer | Uint8Array | Uint8ClampedArray,
        limit?: number
      ): Promise<R>;
    }
  }
}

export {};
