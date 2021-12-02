import { ChainId } from '../common/interfaces/credentials';
import { errorHandler } from '../common/utils/error-handler';
import { QueryHandler } from '../db/handlers';
import { ChainScan } from './core';

async function run(queryHandler: QueryHandler) {
  process.on('uncaughtException', errorHandler);
  process.on('unhandledRejection', errorHandler);

  const chain = await queryHandler.findOneChainByChainId(Number(ChainId), true);
  if (!chain) {
    return;
  }

  const scan = new ChainScan(chain, queryHandler);
  console.log('[*] ChainScan daemon up and running');
  await scan.sync();
}

export { run };
