import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getMe(userId: string) {
    const user = await this.usersRepository.findByIdWithProfiles(userId);
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản người dùng');
    }

    // Bảo mật: Loại bỏ passwordHash và các thông tin nhạy cảm trước khi trả về
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.usersRepository.findByIdWithProfiles(userId);
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản người dùng');
    }

    // Logic Đa hình: Dựa vào Role để gọi Repository tương ứng
    switch (user.role) {
      case Role.STUDENT:
        await this.usersRepository.updateStudentProfile(userId, dto);
        break;
      case Role.TEACHER:
        await this.usersRepository.updateTeacherProfile(userId, dto);
        break;
      case Role.PARENT:
        await this.usersRepository.updateParentProfile(userId, dto);
        break;
      default:
        // Admin hoặc các role không cần update profile phụ
        break;
    }

    // Trả về thông tin user mới nhất sau khi cập nhật
    return this.getMe(userId);
  }
}