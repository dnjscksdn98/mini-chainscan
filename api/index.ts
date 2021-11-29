import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { IndexModule } from './index.module';

async function bootstrap() {
  const server: INestApplication = await NestFactory.create(IndexModule);
  await server.listen(3000);
  console.log('[*] ChainScan API Server up and running');
}

export { bootstrap };
