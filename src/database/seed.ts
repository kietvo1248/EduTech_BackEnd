import { PrismaClient, Role, Gender } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Bắt đầu seed dữ liệu...');

  // 1. Chuẩn bị mật khẩu hash chung (đỡ phải hash nhiều lần tốn time)
  const passwordHash = await argon2.hash('123456'); // Pass mặc định cho tất cả

  // ============================================
  // 1. TẠO TÀI KHOẢN TEST CHÍNH (Admin/User xịn)
  // ============================================
  const mainUserEmail = 'test@edutech.com';
  
  // Xóa cũ nếu có để tránh lỗi Unique
  await prisma.user.deleteMany({ where: { email: mainUserEmail } });

  const mainUser = await prisma.user.create({
    data: {
      email: mainUserEmail,
      passwordHash,
      role: Role.STUDENT,
      isActive: true,
      studentProfile: {
        create: {
          fullName: 'Người Dùng Test',
          gradeLevel: 12,
          schoolName: 'THPT Chuyên Lê Quý Đôn',
          gender: Gender.MALE,
          dateOfBirth: new Date('2006-01-01'),
          diamondBalance: 9999, // Hack full tiền để test
          xpTotal: 5000,
        },
      },
    },
  });

  console.log(`✅ Đã tạo User chính: ${mainUser.email} | Pass: 123456`);

  // ============================================
  // 2. SPAM 50 TÀI KHOẢN HỌC SINH (Bulk Create)
  // ============================================
  console.log('🚀 Đang spam 50 tài khoản học sinh...');

  const studentData = [];
  
  for (let i = 1; i <= 50; i++) {
    studentData.push({
      email: `student${i}@spam.com`,
      passwordHash,
      role: Role.STUDENT,
      isActive: true,
      // Lưu ý: Prisma createMany không hỗ trợ nested write (tạo luôn profile)
      // Nên ta phải tạo User trước, Profile sau hoặc dùng loop create.
      // Để đơn giản và an toàn logic, ta dùng loop create (tuy chậm hơn chút nhưng data chuẩn)
    });
  }

  // Dùng Promise.all để chạy song song cho nhanh
  await Promise.all(
    studentData.map(async (u, index) => {
      // Check exist
      const exists = await prisma.user.findUnique({ where: { email: u.email } });
      if (!exists) {
        await prisma.user.create({
          data: {
            ...u,
            studentProfile: {
              create: {
                fullName: `Học Sinh Spam ${index + 1}`,
                gradeLevel: 10 + Math.floor(Math.random() * 3), // Random lớp 10, 11, 12
                schoolName: 'Trường THPT Test',
                gender: index % 2 === 0 ? Gender.MALE : Gender.FEMALE,
                diamondBalance: Math.floor(Math.random() * 100),
              },
            },
          },
        });
      }
    })
  );

  console.log('✅ Đã spam xong 50 users (student1@spam.com -> student50@spam.com)');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });