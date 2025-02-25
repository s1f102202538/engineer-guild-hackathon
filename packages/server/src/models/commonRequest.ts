import { IsAlpha } from 'class-validator';

export class UserClientIdRequest {
  @IsAlpha()
  clientId!: string;
}
