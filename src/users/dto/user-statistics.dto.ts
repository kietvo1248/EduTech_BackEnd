import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums';

/** Per-role document count (used inside UserStatisticsDto.byRole) */
export class UserRoleStatsDto {
  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
    example: UserRole.Student,
  })
  role!: UserRole;

  @ApiProperty({ example: 42 })
  count!: number;
}

/** Response shape for GET /users/admin/stats */
export class UserStatisticsDto {
  @ApiProperty({ description: 'Total non-deleted users', example: 120 })
  total!: number;

  @ApiProperty({
    description: 'Count of non-deleted users grouped by role',
    example: {
      STUDENT: 80,
      PARENT: 20,
      TEACHER: 15,
      ADMIN: 5,
    },
  })
  byRole!: Record<string, number>;

  @ApiProperty({
    description: 'Non-deleted users with isActive = true',
    example: 110,
  })
  active!: number;

  @ApiProperty({
    description: 'Non-deleted users with isActive = false',
    example: 10,
  })
  inactive!: number;

  @ApiProperty({
    description: 'Soft-deleted users (isDeleted = true)',
    example: 3,
  })
  deleted!: number;
}
