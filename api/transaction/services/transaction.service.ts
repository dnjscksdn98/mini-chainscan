import { Inject, Injectable } from '@nestjs/common';

import { QueryHandler } from '../../../db/handlers';
import { QUERY_HANDLER_PROVIDER } from '../../sequelize';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(QUERY_HANDLER_PROVIDER) private queryHandler: QueryHandler,
  ) { }

  public async getTransactionByHash(chainId: number, hash: string) {
    const transaction = await this.queryHandler.findOneTransactionByChainIdAndHash(chainId, hash, true);
    if (!transaction) {
      throw new Error(`transaction not found(${chainId}:${hash})`);
    }

    const transactionLogs = await this.queryHandler.findAllTransactionLogsByTransactionId(transaction.id, true);
    if (!transactionLogs || !transactionLogs.length) {
      return transaction;
    }

    const logs: any[] = [];
    for (const log of transactionLogs) {
      const topics = await this.queryHandler.findAllTransactionLogTopicsByLogId(log.id, true);
      if (!topics || !topics.length) {
        continue;
      }

      logs.push({
        ...log,
        topics,
      });
    }

    return { ...transaction, logs };
  }
}
