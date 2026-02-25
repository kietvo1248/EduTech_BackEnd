import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateGradeLevelDto {
  @ApiProperty({
    description: 'Grade level name',
    example: 'Grade 1',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Numeric value of the grade level',
    example: 1,
  })
  @IsInt()
  @Min(0)
  value!: number;
}
