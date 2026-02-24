import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TeacherProfileService } from './teacher-profile.service';

@Controller('teacher-profiles')
export class TeacherProfileController {
  constructor(private readonly teacherProfileService: TeacherProfileService) {}

  @Get('user/:userId')
  async getProfileByUserId(@Param('userId') userId: string) {
    return this.teacherProfileService.getProfileByUserId(userId);
  }

  @Get(':id')
  async getProfileById(@Param('id') id: string) {
    return this.teacherProfileService.getProfileById(id);
  }

  @Get()
  async getAllProfiles() {
    return this.teacherProfileService.getAllProfiles();
  }

  @Post()
  async createProfile(@Body() data: any) {
    return this.teacherProfileService.createProfile(data);
  }

  @Put(':id')
  async updateProfile(@Param('id') id: string, @Body() data: any) {
    return this.teacherProfileService.updateProfile(id, data);
  }

  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    await this.teacherProfileService.deleteProfile(id);
    return { message: 'Profile deleted successfully' };
  }

  @Put(':id/bio')
  async updateBio(@Param('id') id: string, @Body('bio') bio: string) {
    return this.teacherProfileService.updateBio(id, bio);
  }
}
