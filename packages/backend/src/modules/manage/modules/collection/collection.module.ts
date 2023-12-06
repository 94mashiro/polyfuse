import { Module } from '@nestjs/common';

import { DrizzleModule } from '@/modules/drizzle/drizzle.module';

import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
  imports: [DrizzleModule],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
