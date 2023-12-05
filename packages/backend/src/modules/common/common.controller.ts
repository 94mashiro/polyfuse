import { Controller, Get } from '@nestjs/common';

import packageJson from '../../../package.json';
import { Public } from '../auth/auth.decorator';

@Controller('common')
export class CommonController {
  @Get('env')
  @Public()
  getEnv() {
    return {
      version: packageJson.version,
    };
  }
}
