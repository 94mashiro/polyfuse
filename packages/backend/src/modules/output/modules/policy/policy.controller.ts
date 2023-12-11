import { Controller, Get, Query } from '@nestjs/common';
import { flattenDeep } from 'lodash';

import { CollectionService } from '../../../manage/modules/collection/collection.service';
import { SubscriptionService } from '../../../manage/modules/subscription/subscription.service';
import { PolymorphicService } from '../../../worker/modules/polymorphic/polymorphic.service';
import { GetOutputPolicyDto } from './policy.dto';

@Controller('output/policy')
export class OutputPolicyController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly collectionService: CollectionService,
    private readonly polymorphicService: PolymorphicService,
  ) {}

  @Get('/')
  async getPolicy(@Query() query: GetOutputPolicyDto) {
    const content = await this.subscriptionService.getSubscriptionContent({ id: query.id });
    const protocol = this.subscriptionService.getSubscriptionProtocol(content);
    const nodes = this.polymorphicService.parseSubscription({ data: content, protocol });
    const policyString = this.polymorphicService.generatePolicy({ nodes, client: query.client });
    return policyString;
  }

  @Get('/collection')
  async getCollectionPolicy(@Query() query: GetOutputPolicyDto) {
    const policy = await this.collectionService.getCollectionById({
      id: query.id,
    });
    const subscriptionIds = policy.subscriptions.map(subscription => subscription.subscription.id);
    const subscriptionNodes = await Promise.all(
      subscriptionIds.map(async id => {
        const content = await this.subscriptionService.getSubscriptionContent({ id });
        const protocol = this.subscriptionService.getSubscriptionProtocol(content);
        return this.polymorphicService.parseSubscription({ data: content, protocol });
      }),
    );
    return this.polymorphicService.generatePolicy({ nodes: flattenDeep(subscriptionNodes), client: query.client });
  }
}
