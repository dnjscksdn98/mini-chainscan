import { CsSequelize } from '../';
import { IBlockCreationAttributes } from '../interfaces/attributes';
import { IChainFindQuery } from '../interfaces/queries';
import { Block, Chain } from '../models';
import { SequelizeRepository } from '../repo';

export class QueryHandler {
  private chainRepo: SequelizeRepository;

  private blockRepo: SequelizeRepository;

  constructor(sequelize: CsSequelize) {
    this.chainRepo = sequelize.getSequelizeRepository(Chain);
    this.blockRepo = sequelize.getSequelizeRepository(Block);
  }

  public async findOneChainByChainId(chainId: number, raw?: boolean): Promise<Chain | null> {
    const query: IChainFindQuery = { chainId };
    return await this.chainRepo.findOneAsync({ where: query, raw });
  }

  public async createBlock(values: IBlockCreationAttributes): Promise<Block> {
    return await this.blockRepo.createAsync(values);
  }
}
