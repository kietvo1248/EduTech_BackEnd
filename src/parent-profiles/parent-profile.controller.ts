import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ParentProfileService } from './parent-profile.service';

@Controller('parent-profiles')
export class ParentProfileController {
  constructor(private readonly parentProfileService: ParentProfileService) {}

  @Get('user/:userId')
  async getProfileByUserId(@Param('userId') userId: string) {
    return this.parentProfileService.getProfileByUserId(userId);
  }

  @Get('phone/:phoneNumber')
  async getProfileByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return this.parentProfileService.getProfileByPhoneNumber(phoneNumber);
  }

  @Get(':id')
  async getProfileById(@Param('id') id: string) {
    return this.parentProfileService.getProfileById(id);
  }

  @Get()
  async getAllProfiles(@Query() filters?: any) {
    if (Object.keys(filters || {}).length > 0) {
      return this.parentProfileService.filterProfiles(filters);
    }
    return this.parentProfileService.getAllProfiles();
  }

  @Post()
  async createProfile(@Body() data: any) {
    return this.parentProfileService.createProfile(data);
  }

  @Put(':id')
  async updateProfile(@Param('id') id: string, @Body() data: any) {
    return this.parentProfileService.updateProfile(id, data);
  }

  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    await this.parentProfileService.deleteProfile(id);
    return { message: 'Profile deleted successfully' };
  }
}
