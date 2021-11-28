import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { IChainCreationAttributes } from '../interfaces/attributes';

@Table({ tableName: 'Chain' })
export class Chain extends Model implements IChainCreationAttributes {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  chainId!: number;

  @AllowNull(false)
  @Column
  syncedBlock!: number;

  @AllowNull(false)
  @Column
  uri!: string;
}
