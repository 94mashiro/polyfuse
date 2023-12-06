/* eslint-disable @typescript-eslint/no-unsafe-assignment -- too strict */
import { Injectable } from '@nestjs/common/decorators';
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common/interfaces';
import { FastifyRequest } from 'fastify';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    if (request.url.startsWith('/api/output/')) {
      return next.handle();
    }
    return next.handle().pipe(
      map(data => ({
        data,
        code: 0,
        message: 'success',
      })),
    );
  }
}
