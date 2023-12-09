import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateSubscriptionDto, GetSubscriptionDetailDto, GetSubscriptionMetadataDto } from './subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('list')
  async listSubscriptions() {
    return this.subscriptionService.listSubscriptions();
  }

  @Get('detail')
  async getSubscriptionDetail(@Query() query: GetSubscriptionDetailDto) {
    return this.subscriptionService.getSubscription(query.id);
  }

  @Post('create')
  async addSubscription(@Body() body: CreateSubscriptionDto) {
    return this.subscriptionService.addSubscription(body);
  }

  @Get('metadata')
  async getSubscriptionMetadata(@Query() query: GetSubscriptionMetadataDto) {
    return this.subscriptionService.getSubscriptionMetadata(query);
  }
}
