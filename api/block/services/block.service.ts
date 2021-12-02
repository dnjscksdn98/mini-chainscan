import { isHex, toHex } from 'web3-utils';

import { Inject, Injectable } from '@nestjs/common';

import { QueryHandler } from '../../../db/handlers';
import { QUERY_HANDLER_PROVIDER } from '../../sequelize';

@Injectable()
export class BlockService {
  constructor(
    @Inject(QUERY_HANDLER_PROVIDER) private queryHandler: QueryHandler,
  ) { }

  public async getBlockByHash(chainId: number, hash: string, withTransactions = "false") {
    const block = await this.queryHandler.findOneBlockByChainIdAndHash(chainId, hash, true);
    if (!block) {
      console.log(block);
      throw new Error(`block not found(${chainId}:${hash})`);
    }

    if (withTransactions === "true") {
      return { ...block, transactions: await this.abstractTransactions(block.id) };
    }
    return block;
  }

  public async getBlockByNumber(chainId: number, number: string, withTransactions = "false") {
    let block = null;
    if (isHex(number)) {
      block = await this.queryHandler.findOneBlockByChainIdAndNumber(chainId, number, true);
    } else {
      block = await this.queryHandler.findOneBlockByChainIdAndNumber(chainId, toHex(number), true);
    }
    if (!block) {
      throw new Error(`block not found(${chainId}:${number})`);
    }

    if (withTransactions === "true") {
      return { ...block, transactions: await this.abstractTransactions(block.id) };
    }
    return block;
  }

  private async abstractTransactions(blockId: number) {
    const abstractedTransactions: any[] = [];

    const transactions = await this.queryHandler.findAllTransactionsByBlockId(blockId, true);
    if (!transactions || !transactions.length) {
      return abstractedTransactions;
    }

    for (const transaction of transactions) {
      const transactionLogs = await this.queryHandler.findAllTransactionLogsByTransactionId(transaction.id, true);
      if (!transactionLogs || !transactionLogs.length) {
        abstractedTransactions.push(transaction);
        continue;
      }

      const logs: any[] = [];
      for (const log of transactionLogs) {
        const topics = await this.queryHandler.findAllTransactionLogTopicsByLogId(log.id, true);
        if (!topics || !topics.length) {
          abstractedTransactions.push(transaction);
          continue;
        }

        logs.push({
          ...log,
          topics,
        });
      }

      abstractedTransactions.push({
        ...transaction,
        logs,
      });
    }
    return abstractedTransactions;
  }
}
