import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common/interfaces';
import { FastifyReply, FastifyRequest } from 'fastify';
import type { Observable } from 'rxjs';

@Injectable()
export class PostInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<FastifyRequest>();
    const response = http.getResponse<FastifyReply>();

    if (request.method === 'POST') {
      if (response.statusCode === 201) {
        context.switchToHttp().getResponse().status(HttpStatus.OK);
      }
    }
    return next.handle();
  }
}
