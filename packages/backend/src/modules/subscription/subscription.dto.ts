import { IsOptional, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  userAgent?: string;
}

export class ParseSubscriptionDto {
  @IsString()
  id: string;

  @IsString()
  client: string;
}

export class GetSubscriptionMetadataDto {
  @IsString()
  id: string;
}
