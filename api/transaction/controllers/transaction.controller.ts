import { Controller, Get, Query } from '@nestjs/common';

import { TransactionService } from '../services';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) { }

  @Get()
  public async getTransactionByHash(
    @Query('chainId') chainId: number,
    @Query('hash') hash: string,
  ) {
    const res = await this.transactionService.getTransactionByHash(chainId, hash);
    return res;
  }
}
