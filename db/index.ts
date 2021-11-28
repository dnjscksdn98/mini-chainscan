import { Sequelize } from 'sequelize-typescript';

import { MySQL } from '../interfaces/credentials';
import { Block, Chain, Transaction, TransactionLog, TransactionLogTopic } from './models';
import { SequelizeRepository } from './repo';

export class CsSequelize {
  private instance: Sequelize;

  constructor() {
    this.instance = new Sequelize(
      MySQL.database,
      MySQL.username,
      MySQL.password,
      {
        host: MySQL.host,
        port: MySQL.port,
        dialect: 'mysql',
        define: {
          charset: 'utf8',
          collate: 'utf8_general_ci',
          timestamps: false,
        },
        logging: false,
        repositoryMode: true,
      }
    )

    this.instance.sync().then(() => {
      console.log('mysql connection success');
    }).catch((e) => {
      console.error(`mysql connection error: ${e}`);
    });

    this.instance.addModels([
      Chain,
      Block,
      Transaction,
      TransactionLog,
      TransactionLogTopic,
    ]);
  }

  public getSequelizeRepository(model: any): SequelizeRepository {
    return new SequelizeRepository(this.instance.getRepository(model));
  }
}
