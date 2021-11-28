import { QueryHandler } from '../../db/handlers';
import { IBlockCreationAttributes } from '../../db/interfaces/attributes';
import { Chain } from '../../db/models';
import { Evm } from '../chains';

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
        continue;
      }

      const latestBlockNumber = await this.evm.getLatestBlockNumber();
      if (!latestBlockNumber) {
        continue;
      }

      if (chain.syncedBlock < latestBlockNumber) {
        await this.syncBlock(chain.syncedBlock + 1);
      }
      console.log('done');
      break;
    }
  }

  private async syncBlock(blockNumber: number) {
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
    await this.queryHandler.createBlock(blockValues);
  }
}
