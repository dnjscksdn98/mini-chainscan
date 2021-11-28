import Web3 from 'web3';

import { Chain } from '../../db/models';

export class Evm {
  private client: Web3;

  constructor(chain: Chain) {
    this.client = new Web3(
      new Web3.providers.HttpProvider(chain.uri),
    );
  }

  public toHex(value: number | string) {
    return this.client.utils.toHex(value);
  }

  public async getBlock(blockNumber: number) {
    return await this.client.eth.getBlock(blockNumber);
  }

  public async getLatestBlockNumber() {
    return await this.client.eth.getBlockNumber();
  }

  public async getTransaction(hash: string) {
    return this.client.eth.getTransaction(hash);
  }

  public async getTransactionReceipt(hash: string) {
    return this.client.eth.getTransactionReceipt(hash);
  }
}
