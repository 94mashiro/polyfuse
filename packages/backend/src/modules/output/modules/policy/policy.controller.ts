import { Controller, Get, Query } from '@nestjs/common';

import { SubscriptionService } from '@/modules/manage/modules/subscription/subscription.service';
import { PolymorphicService } from '@/modules/worker/modules/polymorphic/polymorphic.service';

import { GetOutputPolicyDto } from './policy.dto';

@Controller('output/policy')
export class OutputPolicyController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
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
  getCollectionPolicy(@Query() _query: GetOutputPolicyDto) {}
}
