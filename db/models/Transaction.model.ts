import {
  AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table,
} from 'sequelize-typescript';

import { ITransactionCreationAttributes } from '../interfaces/attributes';
import { Block } from './';

@Table({ tableName: 'Transaction' })
export class Transaction extends Model implements ITransactionCreationAttributes {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => Block)
  @Column
  blockId!: number;

  @AllowNull(false)
  @Column
  from!: string;

  @AllowNull(false)
  @Column
  gas!: number;

  @AllowNull(false)
  @Column
  gasPrice!: string;

  @AllowNull(false)
  @Column
  maxFeePerGas!: string;

  @AllowNull(false)
  @Column
  maxPriorityFeePerGas!: string;

  @AllowNull(false)
  @Column
  hash!: string;

  @AllowNull(false)
  @Column
  input!: string;

  @AllowNull(false)
  @Column
  nonce!: number;

  @AllowNull(false)
  @Column
  to!: string;

  @AllowNull(false)
  @Column
  transactionIndex!: number;

  @AllowNull(false)
  @Column
  value!: string;

  @AllowNull(false)
  @Column
  type!: number;

  @AllowNull(false)
  @Column
  v!: string;

  @AllowNull(false)
  @Column
  r!: string;

  @AllowNull(false)
  @Column
  s!: string;

  @AllowNull(true)
  @Column
  contractAddress!: string;

  @AllowNull(false)
  @Column
  cumulativeGasUsed!: number;

  @AllowNull(false)
  @Column
  effectiveGasPrice!: string;

  @AllowNull(false)
  @Column
  gasUsed!: number;

  @AllowNull(false)
  @Column
  status!: boolean;
}
