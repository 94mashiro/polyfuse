import { Module } from '@nestjs/common';

import { CollectionModule } from './modules/collection/collection.module';
import { CommonModule } from './modules/common/common.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';

@Module({
  imports: [CommonModule, SubscriptionModule, CollectionModule],
})
export class ManageModule {}
