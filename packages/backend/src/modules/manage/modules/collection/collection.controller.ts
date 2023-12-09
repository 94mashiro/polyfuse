import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateCollectionDto, GetCollectionDetailDto, UpdateCollectionDto } from './collection.dto';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get('list')
  async listCollections() {
    return this.collectionService.listCollections();
  }

  @Post('create')
  async createCollection(@Body() body: CreateCollectionDto) {
    await this.collectionService.createCollection(body);
    return true;
  }

  @Get('detail')
  async getCollectionDetail(@Query() query: GetCollectionDetailDto) {
    return this.collectionService.getCollectionById(query);
  }

  @Post('update')
  async updateCollection(@Body() body: UpdateCollectionDto) {
    await this.collectionService.updateCollection(body);
    return true;
  }
}
