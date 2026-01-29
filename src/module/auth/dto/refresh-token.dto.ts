import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ 
    description: 'Refresh Token hiện tại của user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  @IsNotEmpty({ message: 'Refresh token không được để trống' })
  @IsString()
  refreshToken: string;
}