import { QueryHandler } from '../../db/handlers';
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
    }
  }

  private async syncBlock(blockNumber: number) {

  }
}
