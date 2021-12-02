import { Module } from '@nestjs/common';

import { CsSequelize } from '../../db';
import { QueryHandler } from '../../db/handlers';

const queryHandlerProvider = {
  provide: 'QUERY_HANDLER',
  useFactory: async () => new QueryHandler(new CsSequelize()),
};

@Module({
  providers: [queryHandlerProvider],
  exports: [queryHandlerProvider],
})
export class SequelizeModule {}
