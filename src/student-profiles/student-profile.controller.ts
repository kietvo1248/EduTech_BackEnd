import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { StudentProfileService } from './student-profile.service';

@Controller('student-profiles')
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) {}

  @Get('user/:userId')
  async getProfileByUserId(@Param('userId') userId: string) {
    return this.studentProfileService.getProfileByUserId(userId);
  }

  @Get(':id')
  async getProfileById(@Param('id') id: string) {
    return this.studentProfileService.getProfileById(id);
  }

  @Get()
  async getAllProfiles() {
    return this.studentProfileService.getAllProfiles();
  }

  @Post()
  async createProfile(@Body() data: any) {
    return this.studentProfileService.createProfile(data);
  }

  @Put(':id')
  async updateProfile(@Param('id') id: string, @Body() data: any) {
    return this.studentProfileService.updateProfile(id, data);
  }

  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    await this.studentProfileService.deleteProfile(id);
    return { message: 'Profile deleted successfully' };
  }

  @Put(':id/xp/:amount')
  async addXp(@Param('id') id: string, @Param('amount') amount: string) {
    return this.studentProfileService.addXp(id, parseInt(amount));
  }

  @Put(':id/diamonds/:amount')
  async addDiamonds(@Param('id') id: string, @Param('amount') amount: string) {
    return this.studentProfileService.addDiamonds(id, parseInt(amount));
  }
}
