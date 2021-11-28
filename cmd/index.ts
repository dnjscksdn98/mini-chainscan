import { ChainId } from "../interfaces/credentials";
import { errorHandler } from "../utils/error-handler";
import { ChainScan } from "./core";

async function run() {
  process.on('uncaughtException', errorHandler);
  process.on('unhandledRejection', errorHandler);

  const scan = new ChainScan(Number(ChainId));
  scan.init();
}

export { run };
