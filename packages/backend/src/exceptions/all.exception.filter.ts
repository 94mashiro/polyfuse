import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, Logger } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: Error, host: ArgumentsHost) {
    const logger = new Logger();
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    logger.error(
      `[request error] path: ${request.url} method: ${request.method} body: ${JSON.stringify(request.body)} message: ${
        exception.message
      }`,
      exception.stack,
    );

    await response.status(500).send({
      data: null,
      code: 500,
      message: exception.message,
    });
  }
}
