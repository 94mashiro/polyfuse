import { Module } from '@nestjs/common';

import { DrizzleModule } from '../../../drizzle/drizzle.module';
import { PolymorphicModule } from '../../../worker/modules/polymorphic/polymorphic.module';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [DrizzleModule, PolymorphicModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
