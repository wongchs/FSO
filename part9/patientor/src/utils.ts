export const assertNever = (value: never): never => {
  throw new Error(`Unreachable case: ${JSON.stringify(value)}`);
};
