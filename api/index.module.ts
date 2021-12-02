import { Module, NestModule } from '@nestjs/common';

import { BlockModule } from './block';
import { IndexController } from './index.controller';

@Module({
  providers: [],
  imports: [BlockModule],
  controllers: [IndexController],
})
export class IndexModule implements NestModule {
  configure() { }
}
