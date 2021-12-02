import { Module } from '@nestjs/common';

import { SequelizeModule } from '../sequelize';
import { BlockController } from './controllers';
import { BlockService } from './services';

@Module({
  providers: [BlockService],
  imports: [SequelizeModule],
  controllers: [BlockController],
})
export class BlockModule {}
