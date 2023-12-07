import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateCollectionDto } from './collection.dto';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionSerivice: CollectionService) {}

  @Get('list')
  async listCollections() {
    return this.collectionSerivice.listCollections();
  }

  @Post('create')
  async createCollection(@Body() body: CreateCollectionDto) {
    await this.collectionSerivice.createCollection(body);
    return true;
  }
}
