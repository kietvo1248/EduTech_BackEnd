import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutDto {
  @ApiProperty({ 
    description: 'Token cần hủy (Refresh Token)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  @IsNotEmpty({ message: 'Refresh token không được để trống' })
  @IsString()
  refreshToken: string;
}