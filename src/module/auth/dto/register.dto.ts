// src/module/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  Min,
  Max,
  IsDateString,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'hocsinh@gmail.com', description: 'Email đăng nhập' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty({
    example: 'MatKhauManh123',
    description: 'Mật khẩu (tối thiểu 6 ký tự)',
  })
  @IsNotEmpty()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @ApiProperty({ example: 'Nguyễn Văn A', description: 'Họ và tên học sinh' })
  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;

  @ApiProperty({ example: 12, description: 'Khối lớp (6-12)' })
  @IsInt({ message: 'Lớp phải là số nguyên' })
  @Min(6, { message: 'Hệ thống chỉ hỗ trợ từ lớp 6' })
  @Max(12, { message: 'Hệ thống chỉ hỗ trợ đến lớp 12' })
  gradeLevel: number;

  @ApiProperty({
    example: '2008-01-01T00:00:00.000Z',
    description: 'Ngày sinh (ISO 8601)',
  })
  @IsDateString({}, { message: 'Ngày sinh phải đúng định dạng ISO 8601' })
  @IsNotEmpty()
  dateOfBirth: string;
}
