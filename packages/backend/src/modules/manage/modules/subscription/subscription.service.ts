import { HttpException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

import { DrizzleAsyncProvider, DrizzleDB } from '@/modules/drizzle/drizzle.provider';
import { subscriptions } from '@/modules/drizzle/schema';
import { Client } from '@/types/client';
import { getClientUserAgent } from '@/utils/client';
import { parseSubscriptionRawMetadata } from '@/utils/subscription-metadata';

import { CreateSubscriptionDto } from './subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(@Inject(DrizzleAsyncProvider) private db: DrizzleDB) {}

  getSubscription(id: string) {
    return this.db.query.subscriptions.findFirst({ where: (user, { eq }) => eq(user.id, id) });
  }

  async listSubscriptions() {
    return this.db.query.subscriptions.findMany();
  }

  async addSubscription(body: CreateSubscriptionDto) {
    return this.db.insert(subscriptions).values(body).returning();
  }

  async getSubscriptionMetadata(params: { id: string }) {
    const subscription = await this.getSubscription(params.id);
    if (!subscription) {
      throw new HttpException('Subscription not found', 400);
    }
    const { url } = subscription;
    const { headers } = await axios.get(url, {
      headers: {
        'User-Agent': getClientUserAgent(Client.QuantumultX),
      },
    });
    const rawMetadata = headers['subscription-userinfo'];
    return parseSubscriptionRawMetadata(rawMetadata);
  }

  async parseSubscription(params: { id: string; client: string }) {
    const subscription = await this.getSubscription(params.id);
    if (!subscription) {
      throw new HttpException('Subscription not found', 400);
    }
    const { url, userAgent } = subscription;
    return axios
      .get(url, {
        headers: {
          'User-Agent': userAgent,
        },
      })
      .then(res => res.data);
  }

  async downloadSubscriptionData(params: { url: string; userAgent?: string }) {
    return axios
      .get(params.url, {
        headers: {
          'User-Agent': params.userAgent,
        },
      })
      .then(res => res.data);
  }
}
