import { QueryHandler } from '../../db/handlers';
import {
  IBlockCreationAttributes, ITransactionCreationAttributes,
} from '../../db/interfaces/attributes';
import { Chain } from '../../db/models';
import { Evm } from '../chains';
import { TX_INPUT_MAX_LENGTH } from '../constants';

export class ChainScan {
  private evm: Evm;

  constructor(
    private chain: Chain,
    private queryHandler: QueryHandler,
  ) {
    this.evm = new Evm(this.chain);
  }

  public async sync(): Promise<void> {
    while (true) {
      const chain = await this.queryHandler.findOneChainByChainId(this.chain.chainId, true);
      if (!chain) {
        console.log(`chain does not exist = ${this.chain.id}`);
        continue;
      }

      const latestBlockNumber = await this.evm.getLatestBlockNumber();
      console.log(latestBlockNumber);
      if (!latestBlockNumber) {
        console.log(`latest block not found = ${latestBlockNumber}`);
        continue;
      }

      if (chain.syncedBlock < latestBlockNumber) {
        const syncedBlock = chain.syncedBlock + 1;
        await this.syncBlock(syncedBlock);
        await this.queryHandler.updateSyncedBlock(this.chain.id, syncedBlock);
        console.log(`synced block = ${syncedBlock}`);
      }
    }
  }

  private async syncBlock(blockNumber: number): Promise<void> {
    const block = await this.evm.getBlock(blockNumber);
    if (!block) {
      return;
    }

    const blockValues: IBlockCreationAttributes = {
      chainId: this.chain.id,
      baseFeePerGas: block.baseFeePerGas ? this.evm.toHex(block.baseFeePerGas) : '0x',
      difficulty: this.evm.toHex(block.difficulty),
      extraData: block.extraData,
      gasLimit: this.evm.toHex(block.gasLimit),
      gasUsed: this.evm.toHex(block.gasUsed),
      hash: block.hash,
      logsBloom: block.logsBloom,
      miner: block.miner.toLowerCase(),
      mixHash: block['mixHash'] ? block['mixHash'] : '0x',
      nonce: block.nonce,
      number: this.evm.toHex(block.number),
      parentHash: block.parentHash,
      receiptsRoot: block.receiptsRoot,
      sha3Uncles: block.sha3Uncles,
      size: this.evm.toHex(block.size),
      stateRoot: block.stateRoot,
      timestamp: Number(block.timestamp),
      totalDifficulty: this.evm.toHex(block.totalDifficulty),
      transactionsRoot: block.transactionRoot ? block.transactionRoot : '0x',
    };
    const syncedBlock = await this.queryHandler.createBlock(blockValues);
    await this.abstractTransactions(syncedBlock.id, block.transactions);
  }

  private async abstractTransactions(blockId: number, transactions: string[]): Promise<void> {
    for (const transaction of transactions) {
      const rawTransaction = await this.evm.getTransaction(transaction);
      if (!rawTransaction) {
        continue;
      }
      if (rawTransaction.input.length > TX_INPUT_MAX_LENGTH) {
        continue;
      }

      const transactionReceipt = await this.evm.getTransactionReceipt(transaction);
      if (!transactionReceipt) {
        continue;
      }

      const transactionValues: ITransactionCreationAttributes = {
        blockId,
        chainId: this.chain.id,
        from: rawTransaction.from.toLowerCase(),
        gas: this.evm.toHex(rawTransaction.gas),
        gasPrice: this.evm.toHex(rawTransaction.gasPrice),
        maxFeePerGas: rawTransaction['maxFeePerGas'] ? this.evm.toHex(rawTransaction['maxFeePerGas']) : '0x',
        maxPriorityFeePerGas: rawTransaction['maxPriorityFeePerGas'] ? this.evm.toHex(rawTransaction['maxPriorityFeePerGas']) : '0x',
        hash: rawTransaction.hash,
        input: rawTransaction.input,
        nonce: this.evm.toHex(rawTransaction.nonce),
        to: rawTransaction.to ? rawTransaction.to.toLowerCase() : '0x',
        transactionIndex: rawTransaction.transactionIndex ? this.evm.toHex(rawTransaction.transactionIndex) : '0x',
        value: this.evm.toHex(rawTransaction.value),
        type: rawTransaction['type'] ? this.evm.toHex(rawTransaction['type']) : '0x1',
        v: rawTransaction['v'] ? rawTransaction['v'] : '0x',
        r: rawTransaction['r'] ? rawTransaction['r'] : '0x',
        s: rawTransaction['r'] ? rawTransaction['r'] : '0x',
        contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress.toLowerCase() : '0x',
        cumulativeGasUsed: this.evm.toHex(transactionReceipt.cumulativeGasUsed),
        effectiveGasPrice: transactionReceipt['effectiveGasPrice'] ? transactionReceipt['effectiveGasPrice'] : '0x',
        gasUsed: this.evm.toHex(transactionReceipt.gasUsed),
        status: transactionReceipt.status,
      };

      const syncedTransaction = await this.queryHandler.createTransaction(transactionValues);
      await this.abstractTransactionLogs(syncedTransaction.id, transactionReceipt.logs);
    }
  }

  private async abstractTransactionLogs(transactionId: number, logs: any[]): Promise<void> {
    for (const log of logs) {
      const transactionLogValues = {
        transactionId,
        address: log.address.toLowerCase(),
        data: log.data,
        logIndex: this.evm.toHex(log.logIndex),
        removed: log.removed,
      };

      const syncedTransactionLog = await this.queryHandler.createTransactionLog(transactionLogValues);
      await this.abstractTransactionLogTopics(syncedTransactionLog.id, log.topics);
    }
  }

  private async abstractTransactionLogTopics(logId: number, topics: string[]): Promise<void> {
    for (const topic of topics) {
      const transactionLogTopicValues = {
        logId,
        topic,
      };
      await this.queryHandler.createTransactionLogTopic(transactionLogTopicValues);
    }
  }
}
