import { Module } from '@nestjs/common';

import { OutputPolicyModule } from './modules/policy/policy.module';

@Module({
  imports: [OutputPolicyModule],
})
export class OutputModule {}
