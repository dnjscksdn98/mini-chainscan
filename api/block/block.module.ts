import { Module } from '@nestjs/common';

import { BlockController } from './controllers';
import { BlockService } from './services';

@Module({
  providers: [BlockService],
  imports: [],
  controllers: [BlockController],
})
export class BlockModule {}
