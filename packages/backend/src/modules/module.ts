import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule,
    AuthModule,
    CommonModule,
    SubscriptionModule,
  ],
})
export class AppModule {}
