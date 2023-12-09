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

export class GetSubscriptionMetadataDto {
  @IsString()
  id: string;
}

export class GetSubscriptionDetailDto {
  @IsString()
  id: string;
}
