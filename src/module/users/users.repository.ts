import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  // Lấy thông tin User kèm theo Profile
  async findByIdWithProfiles(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
      },
    });
  }

  // Cập nhật Profile Học sinh
  async updateStudentProfile(userId: string, data: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        // 1. Cập nhật thông tin chung ở bảng User
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        gender: data.gender,
        phoneNumber: data.phoneNumber,

        // 2. Cập nhật thông tin riêng ở bảng StudentProfile
        studentProfile: {
          update: {
            schoolName: data.schoolName,
            gradeLevel: data.gradeLevel,
          },
        },
      },
    });
  }

  // Cập nhật Profile Giáo viên
  async updateTeacherProfile(userId: string, data: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        gender: data.gender,
        phoneNumber: data.phoneNumber,

        teacherProfile: {
          update: {
            bio: data.bio,
            major: data.major,
          },
        },
      },
    });
  }

  // Cập nhật Profile Phụ huynh
  async updateParentProfile(userId: string, data: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        // Parent hiện chưa có field riêng nào cập nhật thêm
      },
    });
  }
}
