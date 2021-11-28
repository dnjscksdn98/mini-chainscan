import { CsSequelize } from '../';
import { IChainFindQuery } from '../interfaces/queries';
import { Chain } from '../models';
import { SequelizeRepository } from '../repo';

export class QueryHandler {
  private chainRepo: SequelizeRepository;

  constructor(sequelize: CsSequelize) {
    this.chainRepo = sequelize.getSequelizeRepository(Chain);
  }

  public async findOneChainByChainId(chainId: number, raw?: boolean): Promise<Chain | null> {
    const query: IChainFindQuery = { chainId };
    return await this.chainRepo.findOneAsync({ where: query, raw });
  }
}
