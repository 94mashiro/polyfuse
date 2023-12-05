import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, Logger } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const logger = new Logger();
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();

    logger.error(
      `[request error] path: ${request.url} method: ${request.method} body: ${JSON.stringify(request.body)} message: ${
        exception.message
      }`,
      exception.stack,
    );

    await response.status(status).send({
      data: null,
      code: status,
      message: exception.getResponse(),
    });
  }
}
