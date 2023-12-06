import { IsEnum, IsString } from 'class-validator';

import { Client } from '@/types/client';

export class GetOutputPolicyDto {
  @IsString()
  id: string;

  @IsEnum(Client)
  client: Client;
}
