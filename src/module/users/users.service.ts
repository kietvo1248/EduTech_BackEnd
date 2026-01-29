import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // 1. Lấy thông tin chi tiết (ME)
  async getMe(userId: string) {
    // Lấy user kèm theo profile tương ứng
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    // Loại bỏ các trường nhạy cảm
    const { passwordHash, ...result } = user;
    return result;
  }

  // 2. Cập nhật Profile (Đa hình)
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // Dựa vào Role để update bảng phụ tương ứng
    switch (user.role) {
      case Role.STUDENT:
        return this.updateStudentProfile(userId, dto);
      case Role.TEACHER:
        return this.updateTeacherProfile(userId, dto);
      case Role.PARENT:
        return this.updateParentProfile(userId, dto);
      default:
        return user; // Admin hoặc role khác chưa xử lý
    }
  }

  // Logic riêng cho Student
  private async updateStudentProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.studentProfile.update({
      where: { userId },
      data: {
        fullName: dto.fullName,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
        gender: dto.gender,
        schoolName: dto.schoolName,
        gradeLevel: dto.gradeLevel,
      },
    });
  }

  // Logic riêng cho Teacher
  private async updateTeacherProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.teacherProfile.update({
      where: { userId },
      data: {
        fullName: dto.fullName,
        bio: dto.bio,
        // major: dto.major... (nếu có trong DTO)
      },
    });
  }

  // Logic riêng cho Parent
  private async updateParentProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.parentProfile.update({
      where: { userId },
      data: {
        fullName: dto.fullName,
        // phoneNumber...
      },
    });
  }
}