import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { PolymorphicService } from '@/modules/worker/modules/polymorphic/polymorphic.service';

import {
  CreateSubscriptionDto,
  GetParsedSubscriptionDto,
  GetSubscriptionMetadataDto,
  ParseSubscriptionDto,
} from './subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly polymorphicService: PolymorphicService,
  ) {}

  @Get('list')
  async listSubscriptions() {
    return this.subscriptionService.listSubscriptions();
  }

  @Post('create')
  async addSubscription(@Body() body: CreateSubscriptionDto) {
    return this.subscriptionService.addSubscription(body);
  }

  @Get('parse')
  async parseSubscription(@Query() query: ParseSubscriptionDto) {
    return this.subscriptionService.parseSubscription(query);
  }

  @Get('metadata')
  async getSubscriptionMetadata(@Query() query: GetSubscriptionMetadataDto) {
    return this.subscriptionService.getSubscriptionMetadata(query);
  }

  @Get('download')
  async getParsedSubscription(@Query() query: GetParsedSubscriptionDto) {
    const subscription = await this.subscriptionService.getSubscription(query.id);
    const subscriptionData = await this.subscriptionService.downloadSubscriptionData(subscription);
    const parsedData = this.polymorphicService.parseGeneric(subscriptionData);
    const qxPolicySubscription = this.polymorphicService.generateQuantumultX(parsedData);
    return qxPolicySubscription;
  }
}
