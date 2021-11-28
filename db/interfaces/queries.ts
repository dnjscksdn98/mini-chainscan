import {
  FindAttributeOptions, GroupOption, Includeable, Order, WhereAttributeHash, WhereOptions,
} from 'sequelize/types';

export interface IFindQuery {
  where?: WhereAttributeHash;
  attributes?: FindAttributeOptions;
  include?: Includeable | Includeable[];
  group?: GroupOption;
  order?: Order;
  raw?: boolean;
  offset?: number;
  limit?: number;
}

export interface IChainFindQuery extends WhereAttributeHash {
  id?: WhereOptions | number;
  chainId?: number;
}

export interface IBlockFindQuery extends WhereAttributeHash {

}

export interface ITransactionFindQuery extends WhereAttributeHash {

}

export interface ITransactionLogFindQuery extends WhereAttributeHash {

}

export interface ITransactionLogTopicFindQuery extends WhereAttributeHash {

}
