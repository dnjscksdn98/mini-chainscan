import { Optional } from 'sequelize/types';

export interface IChainAttributes {
  id?: number;
  chainId?: number;
  syncedBlock?: number;
  uri?: string;
}

export interface IBlockAttributes {
  id?: number;
  chainId?: number;
  baseFeePerGas?: string;
  difficulty?: string;
  extraData?: string;
  gasLimit?: number;
  gasUsed?: number;
  hash?: string;
  logsBloom?: string;
  miner?: string;
  mixHash?: string;
  nonce?: string;
  number?: number;
  parentHash?: string;
  receiptsRoot?: string;
  sha3Uncles?: string;
  size?: number;
  stateRoot?: string;
  timestamp?: number;
  totalDifficulty?: string;
  transactionsRoot?: string;
}

export interface ITransactionAttributes {
  id?: number;
  blockId?: number;
  from?: string;
  gas?: number;
  gasPrice?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  hash?: string;
  input?: string;
  nonce?: number;
  to?: string;
  transactionIndex?: number;
  value?: string;
  type?: number;
  v?: string;
  r?: string;
  s?: string;
  contractAddress?: string;
  cumulativeGasUsed?: number;
  effectiveGasPrice?: string;
  gasUsed?: number;
  status?: boolean;
}

export interface ITransactionLogAttributes {
  id?: number;
  transactionId?: number;
  address?: string;
  data?: string;
  logIndex?: number;
  removed?: boolean;
}

export interface ITransactionLogTopicAttributes {
  id?: number;
  logId?: number;
  topic?: string;
}

export interface IChainCreationAttributes extends Optional<IChainAttributes, 'id'> { }

export interface IBlockCreationAttributes extends Optional<IBlockAttributes, 'id'> { }

export interface ITransactionCreationAttributes extends Optional<ITransactionAttributes, 'id'> { }

export interface ITransactionLogCreationAttributes extends Optional<ITransactionLogAttributes, 'id'> { }

export interface ITransactionLogTopicCreationAttributes extends Optional<ITransactionLogTopicAttributes, 'id'> { }
