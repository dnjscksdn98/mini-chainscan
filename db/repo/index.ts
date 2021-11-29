import { Repository } from 'sequelize-typescript';
import { WhereAttributeHash } from 'sequelize/types';

import { IFindQuery } from '../interfaces/queries';

export class SequelizeRepository {
  constructor(
    private readonly repo: Repository<any>,
  ) { }

  public async findOneAsync(options: IFindQuery) {
    try {
      return await this.repo.findOne(options);
    } catch (err) {
      throw err;
    }
  }

  public async createAsync(values: any) {
    try {
      return await this.repo.create(values);
    } catch (err) {
      throw err;
    }
  }

  public async updateAsync(values: Partial<any>, where: WhereAttributeHash): Promise<[number, any[]] | null> {
    try {
      return this.repo.update(values, { where });
    } catch (err) {
      throw err;
    }
  }
}
