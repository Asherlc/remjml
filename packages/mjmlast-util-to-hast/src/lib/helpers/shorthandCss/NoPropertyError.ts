export class NoPropertyError extends Error {
  constructor(propertyName: string) {
    const message: string = `No property ${propertyName} found in CSS`;
    super(message);
  }
}
