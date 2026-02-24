import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums';

export class AuthResponseDto {
  @ApiProperty()
  accessToken!: string | null;

  @ApiProperty()
  refreshToken?: string | null;

  @ApiProperty()
  user!: {
    id: string;
    email: string;
    role: UserRole;
  };

  @ApiProperty({ required: false })
  message?: string;
}
