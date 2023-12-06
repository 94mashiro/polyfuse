import { Module } from '@nestjs/common';

import { PolymorphicService } from './polymorphic.service';

@Module({
  exports: [PolymorphicService],
  providers: [PolymorphicService],
})
export class PolymorphicModule {}
