import { Repository } from 'sequelize-typescript';

import { IFindQuery } from '../interfaces/queries';

export class SequelizeRepository {
  constructor(
    private readonly repo: Repository<any>,
  ) { }

  public async findOneAsync(options: IFindQuery) {
    try {
      return await this.repo.findOne(options);
    } catch (err) {
      return null;
    }
  }
}