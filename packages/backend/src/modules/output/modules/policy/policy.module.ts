import { Module } from '@nestjs/common';

import { SubscriptionModule } from '@/modules/manage/modules/subscription/subscription.module';
import { PolymorphicModule } from '@/modules/worker/modules/polymorphic/polymorphic.module';

import { OutputPolicyController } from './policy.controller';
import { OutputPolicyService } from './policy.service';

@Module({
  imports: [SubscriptionModule, PolymorphicModule],
  controllers: [OutputPolicyController],
  providers: [OutputPolicyService],
})
export class OutputPolicyModule {}
