import { Module, NestModule } from '@nestjs/common';

import { BlockModule } from './block';
import { IndexController } from './index.controller';
import { SequelizeModule } from './sequelize';

@Module({
  providers: [],
  imports: [
    SequelizeModule,
    BlockModule,
  ],
  controllers: [IndexController],
})
export class IndexModule implements NestModule {
  configure() { }
}
