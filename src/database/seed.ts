import {
  PrismaClient,
  Role,
  Gender,
  QuestionType,
  Difficulty,
  SubscriptionStatus,
  TransactionStatus,
  Prisma,
} from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Bắt đầu seed dữ liệu...');

  // 1. CHUẨN BỊ MẬT KHẨU
  const passwordHash = await argon2.hash('123456');

  // 2. XÓA DỮ LIỆU CŨ (Tránh lỗi Unique khi seed lại)
  console.log('🗑️  Đang dọn dẹp dữ liệu cũ...');
  await prisma.session.deleteMany({});
  await prisma.lessonProgress.deleteMany({});
  await prisma.quizAttempt.deleteMany({});
  await prisma.userSubscription.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.material.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.chapter.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.parentStudentLink.deleteMany({});
  await prisma.studentProfile.deleteMany({});
  await prisma.teacherProfile.deleteMany({});
  await prisma.parentProfile.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.subject.deleteMany({});
  await prisma.gradeLevel.deleteMany({});
  await prisma.subscriptionPlan.deleteMany({});

  // ==========================================
  // 3. MASTER DATA (Danh mục)
  // ==========================================
  console.log('📚 Đang tạo Subject, GradeLevel, SubscriptionPlan...');

  // Subjects (12 records)
  const subjectsData = [
    'Toán học',
    'Vật lý',
    'Hóa học',
    'Sinh học',
    'Ngữ văn',
    'Tiếng Anh',
    'Lịch sử',
    'Địa lý',
    'GDCD',
    'Tin học',
    'Công nghệ',
    'Âm nhạc',
  ];
  const subjects: Prisma.SubjectGetPayload<object>[] = [];
  for (const name of subjectsData) {
    const slug = name
      .toLowerCase()
      .replace(/ /g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd');
    const sub = await prisma.subject.create({
      data: { name, slug, iconUrl: `icon-${slug}.png` },
    });
    subjects.push(sub);
  }

  // Grade Levels (7 records: Lớp 6 -> 12)
  const grades: Prisma.GradeLevelGetPayload<object>[] = [];
  for (let i = 6; i <= 12; i++) {
    const gl = await prisma.gradeLevel.create({
      data: { name: `Lớp ${i}`, value: i },
    });
    grades.push(gl);
  }

  // Subscription Plans (3 records)
  const plansData = [
    {
      id: 'BASIC',
      name: 'Gói Cơ Bản',
      price: 0,
      durationDays: 9999,
      features: { ads: true, maxCourses: 3 },
    },
    {
      id: 'PRO_1M',
      name: 'Pro 1 Tháng',
      price: 99000,
      durationDays: 30,
      features: { ads: false, maxCourses: 'unlimited' },
    },
    {
      id: 'PRO_1Y',
      name: 'Pro 1 Năm',
      price: 990000,
      durationDays: 365,
      features: { ads: false, maxCourses: 'unlimited' },
    },
  ];
  const plans: Prisma.SubscriptionPlanGetPayload<object>[] = [];
  for (const p of plansData) {
    const plan = await prisma.subscriptionPlan.create({ data: p });
    plans.push(plan);
  }

  // ==========================================
  // 4. USERS (Tài khoản cứng + Random)
  // ==========================================
  console.log('👤 Đang tạo Users và Profiles...');

  // --- 4.1 ADMIN ---
  await prisma.user.create({
    data: {
      email: 'admin@edutech.com',
      passwordHash,
      role: Role.ADMIN,
      avatarUrl: 'admin.jpg',
    },
  });

  // --- 4.2 TEACHER ---
  const teacherUser = await prisma.user.create({
    data: {
      email: 'teacher@edutech.com',
      passwordHash,
      role: Role.TEACHER,
      teacherProfile: {
        create: {
          fullName: 'Giáo viên Trần Văn B',
          major: 'Toán Học',
          bio: 'Thạc sĩ Sư phạm Toán',
        },
      },
    },
    include: { teacherProfile: true },
  });

  // --- 4.3 PARENT ---
  const parentUser = await prisma.user.create({
    data: {
      email: 'parent@edutech.com',
      passwordHash,
      role: Role.PARENT,
      parentProfile: {
        create: {
          fullName: 'Phụ huynh Nguyễn Văn C',
          phoneNumber: '0987654321',
        },
      },
    },
    include: { parentProfile: true },
  });

  // --- 4.4 STUDENT (Chính) ---
  const studentUser = await prisma.user.create({
    data: {
      email: 'student@edutech.com',
      passwordHash,
      role: Role.STUDENT,
      studentProfile: {
        create: {
          fullName: 'Học sinh Lê Thị D',
          gradeLevel: 10,
          diamondBalance: 500,
          xpTotal: 1200,
          gender: Gender.FEMALE,
        },
      },
    },
    include: { studentProfile: true },
  });

  // --- Liên kết Phụ huynh - Học sinh ---
  await prisma.parentStudentLink.create({
    data: {
      parentId: parentUser.parentProfile.id,
      studentId: studentUser.studentProfile.id,
      isVerified: true,
    },
  });

  // --- 4.5 Tạo thêm 11 Students ngẫu nhiên (Tổng cộng ~15 users) ---
  const randomStudents: Prisma.UserGetPayload<{
    include: { studentProfile: true };
  }>[] = [];
  for (let i = 1; i <= 11; i++) {
    const s = await prisma.user.create({
      data: {
        email: `student${i}@random.com`,
        passwordHash,
        role: Role.STUDENT,
        studentProfile: {
          create: {
            fullName: `Học sinh số ${i}`,
            gradeLevel: Math.floor(Math.random() * 7) + 6,
          },
        },
      },
      include: { studentProfile: true },
    });
    randomStudents.push(s);
  }
  const allStudents = [studentUser, ...randomStudents];

  // ==========================================
  // 5. ACADEMIC CONTENT (Khóa học, Bài giảng...)
  // ==========================================
  console.log('🎓 Đang tạo Courses, Chapters, Lessons, Questions...');

  const courses: Prisma.CourseGetPayload<object>[] = [];
  const lessons: Prisma.LessonGetPayload<object>[] = [];

  // Tạo 10 Khóa học
  for (let i = 1; i <= 10; i++) {
    const course = await prisma.course.create({
      data: {
        title: `Khóa học Siêu tốc ${i}`,
        description: `Mô tả chi tiết cho khóa học ${i}`,
        isPublished: true,
        isPro: i % 2 === 0, // Đan xen khóa miễn phí và Pro
        subjectId: subjects[i % subjects.length].id,
        gradeLevelId: grades[i % grades.length].id,
        authorId: teacherUser.teacherProfile.id, // Liên kết với Profile Giáo viên cứng
      },
    });
    courses.push(course);

    // Mỗi khóa có 2 Chapter (Tổng 20 Chapters)
    for (let j = 1; j <= 2; j++) {
      const chapter = await prisma.chapter.create({
        data: {
          title: `Chương ${j} của Khóa ${i}`,
          orderIndex: j,
          courseId: course.id,
        },
      });

      // Mỗi Chapter có 1-2 Lesson (Tổng khoảng 30 Lessons)
      const lesson = await prisma.lesson.create({
        data: {
          title: `Bài học ${j} - Chương ${j}`,
          contentMd: `Nội dung markdown bài học ${j}`,
          orderIndex: j,
          chapterId: chapter.id,
          durationSeconds: 300 * j,
          videoUrl: `https://youtube.com/watch?v=sample${i}${j}`,
        },
      });
      lessons.push(lesson);

      // Thêm Material cho Lesson
      await prisma.material.create({
        data: {
          lessonId: lesson.id,
          title: `Tài liệu bài ${j}`,
          fileUrl: `https://storage/file${j}.pdf`,
          type: 'PDF',
        },
      });

      // Thêm 2 Questions cho Lesson
      for (let q = 1; q <= 2; q++) {
        await prisma.question.create({
          data: {
            lessonId: lesson.id,
            contentHtml: `<p>Câu hỏi trắc nghiệm ${q} bài ${j}</p>`,
            type: QuestionType.MULTIPLE_CHOICE,
            difficulty: Difficulty.MEDIUM,
            options: JSON.parse(
              '{"A": "Đáp án 1", "B": "Đáp án 2", "C": "Đáp án 3", "D": "Đáp án 4"}',
            ) as Prisma.InputJsonValue,
            correctAnswer: 'A',
            explanation: 'Vì A là đáp án đúng theo SGK.',
          },
        });
      }
    }
  }

  // ==========================================
  // 6. LOGS & ACTIVITIES (Giao dịch, Tiến trình...)
  // ==========================================
  console.log('⚙️ Đang tạo Sessions, Transactions, Progress...');

  for (let i = 0; i < 15; i++) {
    const randomUser = allStudents[i % allStudents.length];

    // Tạo Session
    await prisma.session.create({
      data: {
        userId: randomUser.id,
        hashedRt: await argon2.hash(`refresh_token_${i}`),
        deviceInfo: 'Chrome on Windows',
        ipAddress: `192.168.1.${i}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Tạo UserSubscription
    await prisma.userSubscription.create({
      data: {
        userId: randomUser.id,
        planId: plans[i % plans.length].id,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: SubscriptionStatus.ACTIVE,
      },
    });

    // Tạo Transaction
    await prisma.transaction.create({
      data: {
        userId: randomUser.id,
        amount: 99000,
        provider: 'MOMO',
        providerRefId: `MOMO_REF_${i}`,
        status: TransactionStatus.SUCCESS,
      },
    });

    // Tạo Notification
    await prisma.notification.create({
      data: {
        userId: randomUser.id,
        title: `Thông báo số ${i}`,
        message: 'Bạn có một bài tập chưa hoàn thành',
        type: 'SYSTEM',
      },
    });

    // Tạo Lesson Progress
    await prisma.lessonProgress.create({
      data: {
        userId: randomUser.id,
        lessonId: lessons[i % lessons.length].id,
        isCompleted: i % 2 === 0,
        lastWatchedSec: 120,
      },
    });
  }

  console.log('✅ SEED THÀNH CÔNG! Dữ liệu đã sẵn sàng.');
  console.log('----------------------------------------------------');
  console.log('Tài khoản test cứng (Mật khẩu: 123456):');
  console.log('- ADMIN:    admin@edutech.com');
  console.log('- TEACHER:  teacher@edutech.com');
  console.log('- PARENT:   parent@edutech.com');
  console.log('- STUDENT:  student@edutech.com');
  console.log('----------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
