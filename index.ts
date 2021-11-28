import { run } from './cmd';
import { CsSequelize } from './db';
import { QueryHandler } from './db/handlers';

async function main() {
  const queryHandler = new QueryHandler(new CsSequelize());
  run(queryHandler);
}
main();
