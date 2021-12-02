import { CsSequelize } from '../';
import {
  IBlockCreationAttributes, ITransactionCreationAttributes, ITransactionLogCreationAttributes,
  ITransactionLogTopicCreationAttributes,
} from '../interfaces/attributes';
import {
  IBlockFindQuery, IChainFindQuery, ITransactionFindQuery, ITransactionLogFindQuery,
  ITransactionLogTopicFindQuery,
} from '../interfaces/queries';
import { Block, Chain, Transaction, TransactionLog, TransactionLogTopic } from '../models';
import { SequelizeRepository } from '../repo';

export class QueryHandler {
  private chainRepo: SequelizeRepository;

  private blockRepo: SequelizeRepository;

  private transactionRepo: SequelizeRepository;

  private transactionLogRepo: SequelizeRepository;

  private transactionLogTopicRepo: SequelizeRepository;

  constructor(sequelize: CsSequelize) {
    this.chainRepo = sequelize.getSequelizeRepository(Chain);
    this.blockRepo = sequelize.getSequelizeRepository(Block);
    this.transactionRepo = sequelize.getSequelizeRepository(Transaction);
    this.transactionLogRepo = sequelize.getSequelizeRepository(TransactionLog);
    this.transactionLogTopicRepo = sequelize.getSequelizeRepository(TransactionLogTopic);
  }

  // Chain
  public async findOneChainByChainId(chainId: number, raw?: boolean): Promise<Chain | null> {
    const query: IChainFindQuery = { chainId };
    return await this.chainRepo.findOneAsync({ where: query, raw });
  }

  public async updateSyncedBlock(id: number, syncedBlock: number): Promise<void> {
    await this.chainRepo.updateAsync({ syncedBlock }, { id });
  }

  // Block
  public async findOneBlockByChainIdAndHash(chainId: number, hash: string, raw?: boolean): Promise<Block | null> {
    const query: IBlockFindQuery = { chainId, hash };
    return await this.blockRepo.findOneAsync({ where: query, raw });
  }

  public async findOneBlockByChainIdAndNumber(chainId: number, number: string, raw?: boolean): Promise<Block | null> {
    const query: IBlockFindQuery = { chainId, number };
    return await this.blockRepo.findOneAsync({ where: query, raw });
  }

  public async createBlock(values: IBlockCreationAttributes): Promise<Block> {
    return await this.blockRepo.createAsync(values);
  }

  // Transaction
  public async findAllTransactionsByBlockId(blockId: number, raw?: boolean): Promise<Transaction[] | null> {
    const query: ITransactionFindQuery = { blockId };
    return await this.transactionRepo.findAllAsync({ where: query, raw });
  }

  public async createTransaction(values: ITransactionCreationAttributes): Promise<Transaction> {
    return await this.transactionRepo.createAsync(values);
  }

  // TransactionLog
  public async findAllTransactionLogsByTransactionId(transactionId: number, raw?: boolean): Promise<TransactionLog[] | null> {
    const query: ITransactionLogFindQuery = { transactionId };
    return await this.transactionLogRepo.findAllAsync({ where: query, raw });
  }

  public async createTransactionLog(values: ITransactionLogCreationAttributes): Promise<TransactionLog> {
    return await this.transactionLogRepo.createAsync(values);
  }

  // TransactionLogTopic
  public async findAllTransactionLogTopicsByLogId(logId: number, raw?: boolean): Promise<TransactionLogTopic[] | null> {
    const query: ITransactionLogTopicFindQuery = { logId };
    return await this.transactionLogTopicRepo.findAllAsync({ where: query, raw });
  }

  public async createTransactionLogTopic(values: ITransactionLogTopicCreationAttributes): Promise<TransactionLogTopic> {
    return await this.transactionLogTopicRepo.createAsync(values);
  }
}
