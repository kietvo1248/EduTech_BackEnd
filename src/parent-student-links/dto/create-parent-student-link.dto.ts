import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateParentStudentLinkDto {
  @ApiProperty({
    description: 'Parent user ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  parentId!: string;

  @ApiProperty({
    description: 'Student user ID',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @ApiProperty({
    description: 'Whether the link is verified',
    example: false,
  })
  @IsBoolean()
  isVerified!: boolean;
}
