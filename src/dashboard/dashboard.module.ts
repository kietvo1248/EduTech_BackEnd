import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { LearningPathModule } from '../learning-path/learning-path.module';
import { LessonProgressModule } from '../lesson-progress/lesson-progress.module';

@Module({
  imports: [LearningPathModule, LessonProgressModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
