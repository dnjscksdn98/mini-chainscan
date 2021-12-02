import { Controller, Get, Query } from '@nestjs/common';

import { BlockService } from '../services';

@Controller('blocks')
export class BlockController {
  constructor(
    private readonly blockService: BlockService,
  ) { }

  @Get('hash')
  public async getBlockByHash(
    @Query('chainId') chainId: number,
    @Query('hash') hash: string,
    @Query('withTransactions') withTransactions: string,
  ) {
    const res = await this.blockService.getBlockByHash(chainId, hash, withTransactions);
    return res;
  }

  @Get('number')
  public async getBlockByNumber(
    @Query('chainId') chainId: number,
    @Query('number') number: string,
    @Query('withTransactions') withTransactions: string,
  ) {
    const res = await this.blockService.getBlockByNumber(chainId, number, withTransactions);
    return res;
  }
}
