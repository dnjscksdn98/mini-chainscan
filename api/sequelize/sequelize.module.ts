import { Module } from '@nestjs/common';

import { CsSequelize } from '../../db';
import { QueryHandler } from '../../db/handlers';

export const QUERY_HANDLER_PROVIDER = 'QUERY_HANDLER';

const queryHandlerProvider = {
  provide: QUERY_HANDLER_PROVIDER,
  useFactory: async () => new QueryHandler(new CsSequelize()),
};

@Module({
  providers: [queryHandlerProvider],
  exports: [queryHandlerProvider],
})
export class SequelizeModule {}
