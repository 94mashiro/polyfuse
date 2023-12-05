/* eslint-disable @typescript-eslint/no-unsafe-assignment -- too strict */
import { Injectable } from '@nestjs/common/decorators';
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common/interfaces';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        data,
        code: 0,
        message: 'success',
      })),
    );
  }
}
