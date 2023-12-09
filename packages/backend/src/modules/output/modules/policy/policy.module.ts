import { Module } from '@nestjs/common';

import { CollectionModule } from '@/modules/manage/modules/collection/collection.module';
import { SubscriptionModule } from '@/modules/manage/modules/subscription/subscription.module';
import { PolymorphicModule } from '@/modules/worker/modules/polymorphic/polymorphic.module';

import { OutputPolicyController } from './policy.controller';
import { OutputPolicyService } from './policy.service';

@Module({
  controllers: [OutputPolicyController],
  imports: [SubscriptionModule, PolymorphicModule, CollectionModule],
  providers: [OutputPolicyService],
})
export class OutputPolicyModule {}
