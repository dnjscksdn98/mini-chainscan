import { QueryHandler } from '../db/handlers';
import { ChainId } from '../interfaces/credentials';
import { errorHandler } from '../utils/error-handler';
import { ChainScan } from './core';

async function run(queryHandler: QueryHandler) {
  process.on('uncaughtException', errorHandler);
  process.on('unhandledRejection', errorHandler);

  const chain = await queryHandler.findOneChainByChainId(Number(ChainId), true);
  if (!chain) {
    return;
  }

  console.log(chain);

  const scan = new ChainScan(chain, queryHandler);
  await scan.sync();
}

export { run };
