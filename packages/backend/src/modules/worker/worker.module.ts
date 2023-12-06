import { Module } from '@nestjs/common';

import { PolymorphicModule } from './modules/polymorphic/polymorphic.module';

@Module({
  imports: [PolymorphicModule],
})
export class WorkerModule {}
