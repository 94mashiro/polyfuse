import { Module } from '@nestjs/common';

import { CommonModule } from './modules/common/common.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';

@Module({
  imports: [CommonModule, SubscriptionModule],
})
export class ManageModule {}
