export const errorHandler = (err: Error) => {
  console.error(err);
  console.error(err.stack);
  process.exit(1);
};
