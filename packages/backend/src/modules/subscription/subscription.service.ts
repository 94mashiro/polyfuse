import { HttpException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

import { parseSubscriptionRawMetadata } from '../../utils/subscription-metadata';
import { DrizzleAsyncProvider, DrizzleDB } from '../drizzle/drizzle.provider';
import { subscriptions } from '../drizzle/schema';
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
        'User-Agent': 'Quantumult X/1.0.8 (iPhone; iOS 14.4.2; Scale/3.00)',
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
    console.log(url, {
      'User-Agent': userAgent,
    });
    return axios
      .get(url, {
        headers: {
          'User-Agent': userAgent,
        },
      })
      .then(res => {
        console.log(res.headers);
        return res.headers['subscription-userinfo'];
      });
  }
}
