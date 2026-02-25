import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateParentProfileDto {
  @ApiProperty({
    description: 'User ID this profile belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'Parent full name',
    example: 'Robert Johnson',
  })
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({
    description: 'Parent phone number',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;
}
