import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Chú ý đường dẫn import
import { RegisterDto, LoginDto, LogoutDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  // 1. Register
  async register(dto: RegisterDto) {
    const hash = await argon.hash(dto.password);
    
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          passwordHash: hash, // Sửa tên trường theo schema: password -> passwordHash
          studentProfile: {
            create: {
              fullName: dto.fullName,
              gradeLevel: dto.gradeLevel,
              dateOfBirth: new Date(dto.dateOfBirth),
            },
          },
        },
      });
      // Tạo session mới
      return this.signTokens(newUser.id, newUser.email, newUser.role);
    } catch (error) {
      if ((error as any).code === 'P2002') throw new ForbiddenException('Email đã tồn tại');
      throw error;
    }
  }

  // 2. Login Local
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !user.passwordHash) throw new ForbiddenException('Sai tài khoản hoặc mật khẩu');

    const pwMatches = await argon.verify(user.passwordHash, dto.password);
    if (!pwMatches) throw new ForbiddenException('Sai tài khoản hoặc mật khẩu');

    return this.signTokens(user.id, user.email, user.role);
  }

  // 3. Login Google Logic
  async googleLogin(req) {
    if (!req.user) return 'No user from google';
    
    const { email, firstName, lastName } = req.user;
    
    let user = await this.prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          // Google login không có passwordHash
          studentProfile: {
            create: {
              fullName: `${firstName} ${lastName}`,
              gradeLevel: 10, // Mặc định lớp 10, user sẽ update sau
            }
          }
        }
      })
    }
    
    return this.signTokens(user.id, user.email, user.role);
  }

  // 4. Logout
  async logout(userId: string, refreshToken: string) {
    // Lấy tất cả session của user để tìm đúng session cần xóa
    const sessions = await this.prisma.session.findMany({ where: { userId } });
    
    for (const session of sessions) {
      // So sánh refresh token gửi lên với hash trong DB
      const isMatch = await argon.verify(session.hashedRt, refreshToken);
      if (isMatch) {
        // Xóa session này đi
        await this.prisma.session.delete({ where: { id: session.id } });
        break; // Tìm thấy và xóa xong thì dừng
      }
    }
    return { message: 'Đăng xuất thành công' };
  }

  // 5. Refresh Token
  async refreshTokens(userId: string, rt: string) {
    // Tìm user
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ForbiddenException('Access Denied');

    // Tìm xem có session nào khớp với token này không
    const sessions = await this.prisma.session.findMany({ where: { userId } });
    let matchedSession = null;

    for (const session of sessions) {
       if (await argon.verify(session.hashedRt, rt)) {
         matchedSession = session;
         break;
       }
    }

    if (!matchedSession) throw new ForbiddenException('Access Denied - Invalid Token');

    // Xóa session cũ (Rotation - Bảo mật)
    await this.prisma.session.delete({ where: { id: matchedSession.id } });

    // Cấp cặp token mới + tạo session mới
    return this.signTokens(user.id, user.email, user.role);
  }

  // Helper: Tạo Token & Lưu Session
  async signTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, { 
        expiresIn: this.config.get('JWT_ACCESS_EXPIRES'), 
        secret: this.config.get('JWT_ACCESS_SECRET') 
      }),
      this.jwtService.signAsync(payload, { 
        expiresIn: this.config.get('JWT_REFRESH_EXPIRES'), 
        secret: this.config.get('JWT_REFRESH_SECRET') 
      }),
    ]);

    // Hash Refresh Token
    const hashedRt = await argon.hash(rt);

    // Tính thời gian hết hạn (ví dụ 7 ngày)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); 

    // LƯU VÀO BẢNG SESSION (Thay vì update User)
    await this.prisma.session.create({
      data: {
        userId,
        hashedRt,
        expiresAt,
        deviceInfo: 'Mobile App', // Có thể lấy từ User-Agent nếu muốn
      }
    });

    return { access_token: at, refresh_token: rt };
  }
}