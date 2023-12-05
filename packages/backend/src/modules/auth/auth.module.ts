import { Module } from '@nestjs/common';

import { AuthGuardProvider } from './auth.guard';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthGuardProvider],
  exports: [],
})
export class AuthModule {}
