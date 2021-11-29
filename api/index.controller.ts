import { Response } from 'express';

import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

@Controller()
export class IndexController {
  @Get('health')
  public async getHealth(@Res() response: Response): Promise<void> {
    response.status(HttpStatus.OK).send({ status: true });
  }
}
