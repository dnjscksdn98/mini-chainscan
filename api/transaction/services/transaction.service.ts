import { Inject, Injectable } from '@nestjs/common';

import { QueryHandler } from '../../../db/handlers';
import { QUERY_HANDLER_PROVIDER } from '../../sequelize';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(QUERY_HANDLER_PROVIDER) private queryHandler: QueryHandler,
  ) { }
}
