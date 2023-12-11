import { HttpException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { asc, eq } from 'drizzle-orm';

import { Client } from '../../../../types/client';
import { SubscriptionFormat } from '../../../../types/subscription';
import { isBase64String } from '../../../../utils/base64';
import { getClientUserAgent } from '../../../../utils/client';
import { parseSubscriptionRawMetadata } from '../../../../utils/subscription-metadata';
import { DrizzleAsyncProvider, DrizzleDB } from '../../../drizzle/drizzle.provider';
import { subscriptions } from '../../../drizzle/schema';
import { CreateSubscriptionDto } from './subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(@Inject(DrizzleAsyncProvider) private db: DrizzleDB) {}

  getSubscription(id: string) {
    return this.db.query.subscriptions.findFirst({ where: (user, { eq }) => eq(user.id, id) });
  }

  async listSubscriptions() {
    return this.db.query.subscriptions.findMany({ orderBy: [asc(subscriptions.createdAt)] });
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

  async getSubscriptionContent(params: { id: string }) {
    const subscription = await this.getSubscription(params.id);
    if (!subscription) {
      throw new HttpException('Subscription not found', 400);
    }
    const { url, userAgent } = subscription;
    return axios
      .get<string>(url, {
        headers: {
          'User-Agent': userAgent || getClientUserAgent(Client.Shadowrocket),
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

  getSubscriptionProtocol(data: string) {
    if (isBase64String(data)) {
      return SubscriptionFormat.SIP002;
    }
    throw new HttpException('Unsupported subscription protocol', 400);
  }

  async updateSubscription(params: { id: string; name: string; url: string; userAgent?: string }) {
    await this.db
      .update(subscriptions)
      .set({
        name: params.name,
        url: params.url,
        userAgent: params.userAgent,
      })
      .where(eq(subscriptions.id, params.id));
  }

  deleteSubscription(params: { id: string }) {
    return this.db.delete(subscriptions).where(eq(subscriptions.id, params.id));
  }
}
