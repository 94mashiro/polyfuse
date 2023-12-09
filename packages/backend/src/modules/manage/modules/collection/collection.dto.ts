import { IsArray, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  name: string;

  @IsArray()
  subIds: string[];
}

export class GetCollectionDetailDto {
  @IsString()
  id: string;
}

export class UpdateCollectionDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  subIds: string[];
}
