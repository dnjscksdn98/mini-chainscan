import { Module, NestModule } from '@nestjs/common';

import { BlockModule } from './block';
import { IndexController } from './index.controller';
import { SequelizeModule } from './sequelize';
import { TransactionModule } from './transaction';

@Module({
  providers: [],
  imports: [
    SequelizeModule,
    BlockModule,
    TransactionModule,
  ],
  controllers: [IndexController],
})
export class IndexModule implements NestModule {
  configure() { }
}
