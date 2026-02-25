import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, EmailVerificationStatus } from '../../enums';

export class UserDto {
  @ApiProperty({ description: 'MongoDB document id' })
  id!: string;

  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  role!: UserRole;

  @ApiPropertyOptional({
    type: String,
    nullable: true,
    example: 'https://cdn.example.com/avatar.png',
  })
  avatarUrl?: string | null;

  @ApiProperty({ description: 'Whether the account is active' })
  isActive!: boolean;

  @ApiProperty({
    description: 'Soft-delete flag; true means the record has been deleted',
  })
  isDeleted!: boolean;

  @ApiPropertyOptional({
    type: Date,
    nullable: true,
    description: 'Timestamp of soft deletion',
  })
  deletedAt?: Date | null;

  @ApiProperty({
    enum: EmailVerificationStatus,
    enumName: 'EmailVerificationStatus',
  })
  emailVerificationStatus!: EmailVerificationStatus;

  @ApiPropertyOptional({ type: String, nullable: true })
  emailVerificationToken?: string | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  emailVerificationExpires?: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
