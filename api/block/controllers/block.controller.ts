import { response } from 'express';

import { Controller, Get, HttpStatus, Query } from '@nestjs/common';

import { BlockService } from '../services';

@Controller()
export class BlockController {
  constructor(
    private readonly blockService: BlockService,
  ) { }

  @Get()
  public async getBlockByHash(
    @Query('chainId') chainId: number,
    @Query('hash') hash: string,
    @Query('withTransactions') withTransactions: boolean,
  ): Promise<void> {
    const res = await this.blockService.getBlockByHash(chainId, hash, withTransactions);
    response.status(HttpStatus.OK).send(res);
  }

  @Get()
  public async getBlockByNumber(
    @Query('chainId') chainId: number,
    @Query('number') number: number,
    @Query('withTransactions') withTransactions: boolean,
  ): Promise<void> {
    const res = await this.blockService.getBlockByNumber(chainId, number, withTransactions);
    response.status(HttpStatus.OK).send(res);
  }
}
