import { Controller, Get } from '@nestjs/common';

import packageJson from '../../../../../package.json';

@Controller('common')
export class CommonController {
  @Get('env')
  getEnv() {
    return {
      version: packageJson.version,
    };
  }
}
