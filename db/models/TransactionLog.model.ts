import {
  AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table,
} from 'sequelize-typescript';

import { ITransactionLogCreationAttributes } from '../interfaces/attributes';
import { Transaction } from './';

@Table({ tableName: 'TransactionLog' })
export class TransactionLog extends Model implements ITransactionLogCreationAttributes {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => Transaction)
  @Column
  transactionId!: number;

  @AllowNull(false)
  @Column
  address!: string;

  @AllowNull(false)
  @Column
  data!: string;

  @AllowNull(false)
  @Column
  logIndex!: number;

  @AllowNull(false)
  @Column
  removed!: boolean;
}
