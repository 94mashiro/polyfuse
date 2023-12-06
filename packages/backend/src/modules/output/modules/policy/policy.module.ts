import { Module } from '@nestjs/common';

import { OutputPolicyController } from './policy.controller';
import { OutputPolicyService } from './policy.service';

@Module({
  controllers: [OutputPolicyController],
  providers: [OutputPolicyService],
})
export class OutputPolicyModule {}
