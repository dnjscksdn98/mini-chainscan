import {
  AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table,
} from 'sequelize-typescript';

import { IBlockCreationAttributes } from '../interfaces/attributes';
import { Chain } from './';

@Table({ tableName: 'Block' })
export class Block extends Model implements IBlockCreationAttributes {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => Chain)
  @Column
  chainId!: number;

  @AllowNull(false)
  @Column
  baseFeePerGas!: string;

  @AllowNull(false)
  @Column
  difficulty!: string;

  @AllowNull(false)
  @Column
  extraData!: string;

  @AllowNull(false)
  @Column
  gasLimit!: string;

  @AllowNull(false)
  @Column
  gasUsed!: string;

  @AllowNull(false)
  @Column
  hash!: string;

  @AllowNull(false)
  @Column
  logsBloom!: string;

  @AllowNull(false)
  @Column
  miner!: string;

  @AllowNull(false)
  @Column
  mixHash!: string;

  @AllowNull(false)
  @Column
  nonce!: string;

  @AllowNull(false)
  @Column
  number!: string;

  @AllowNull(false)
  @Column
  parentHash!: string;

  @AllowNull(false)
  @Column
  receiptsRoot!: string;

  @AllowNull(false)
  @Column
  sha3Uncles!: string;

  @AllowNull(false)
  @Column
  size!: string;

  @AllowNull(false)
  @Column
  stateRoot!: string;

  @AllowNull(false)
  @Column
  timestamp!: number;

  @AllowNull(false)
  @Column
  totalDifficulty!: string;

  @AllowNull(false)
  @Column
  transactionsRoot!: string;
}
