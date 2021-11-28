import {
  AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table,
} from 'sequelize-typescript';

import { ITransactionLogTopicCreationAttributes } from '../interfaces/attributes';
import { TransactionLog } from './';

@Table({ tableName: 'TransactionLogTopic' })
export class TransactionLogTopic extends Model implements ITransactionLogTopicCreationAttributes {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => TransactionLog)
  @Column
  logId!: number;

  @AllowNull(false)
  @Column
  topic!: string;
}
