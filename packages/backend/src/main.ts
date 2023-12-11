import 'dotenv/config';

import * as fs from 'node:fs';

import compression from '@fastify/compress';
import cors from '@fastify/cors';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, PartialGraphHost } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AllExceptionsFilter } from './exceptions/all.exception.filter';
import { HttpExceptionFilter } from './exceptions/http.exception.filter';
import { PostInterceptor } from './interceptors/post.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppModule } from './modules/module';

async function bootstrap() {
  const fastify = new FastifyAdapter();
  await fastify.register(compression as any, {
    global: true,
  });
  await fastify.register(cors as any, {
    origin: true,
    maxAge: 86400,
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify, {
    snapshot: true,
    abortOnError: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor(), new PostInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 3001);
}
bootstrap().catch(() => {
  fs.writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
  process.exit(1);
});
