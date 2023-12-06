import { IsArray, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  name: string;

  @IsArray()
  subIds: string[];
}
