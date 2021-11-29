import { Module, NestModule } from '@nestjs/common';

import { IndexController } from './index.controller';

@Module({
  providers: [],
  imports: [],
  controllers: [IndexController],
})
export class IndexModule implements NestModule {
  configure() { }
}
