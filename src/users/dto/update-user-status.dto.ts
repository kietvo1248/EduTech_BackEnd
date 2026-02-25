import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateUserStatusDto {
  @ApiProperty({
    description: 'Set the active status of the user explicitly.',
    example: true,
  })
  @IsBoolean()
  isActive!: boolean;
}
