import { Controller, Get } from '@nestjs/common';

import { Public } from '@/modules/auth/auth.decorator';

import packageJson from '../../../../../package.json';

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
