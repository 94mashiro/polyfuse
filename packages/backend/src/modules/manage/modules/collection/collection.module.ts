import { Module } from '@nestjs/common';

import { DrizzleModule } from '../../../drizzle/drizzle.module';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
  imports: [DrizzleModule],
  controllers: [CollectionController],
  providers: [CollectionService],
  exports: [CollectionService],
})
export class CollectionModule {}
