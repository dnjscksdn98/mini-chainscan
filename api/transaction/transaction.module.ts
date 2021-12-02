import { Module } from '@nestjs/common';

import { SequelizeModule } from '../sequelize';
import { TransactionController } from './controllers';
import { TransactionService } from './services';

@Module({
  providers: [TransactionService],
  imports: [SequelizeModule],
  controllers: [TransactionController],
})
export class TransactionModule { }
