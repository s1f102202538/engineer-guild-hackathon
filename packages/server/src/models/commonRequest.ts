import { IsNotEmpty, IsString } from 'class-validator';

export class UserClientIdRequest {
  @IsString()
  @IsNotEmpty()
  clientId!: string;
}
