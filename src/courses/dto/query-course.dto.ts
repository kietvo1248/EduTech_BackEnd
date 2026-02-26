import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { GradeLevel, CourseStatus, CourseType } from '../../enums';

export class FilterCourseDto {
  @ApiPropertyOptional({
    description: 'Filter by subject ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsOptional()
  @IsString()
  subjectId?: string;

  @ApiPropertyOptional({
    description: 'Filter by grade level',
    enum: GradeLevel,
    example: GradeLevel.Grade10,
  })
  @IsOptional()
  @IsEnum(GradeLevel)
  gradeLevel?: GradeLevel;

  @ApiPropertyOptional({
    description: 'Filter by author ID',
    example: '507f1f77bcf86cd799439012',
  })
  @IsOptional()
  @IsString()
  authorId?: string;

  @ApiPropertyOptional({
    description: 'Filter by course status',
    enum: CourseStatus,
    example: CourseStatus.Published,
  })
  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;

  @ApiPropertyOptional({
    description: 'Filter by course type',
    enum: CourseType,
    example: CourseType.Free,
  })
  @IsOptional()
  @IsEnum(CourseType)
  type?: CourseType;

  @ApiPropertyOptional({
    description: 'Search by title or description',
    example: 'Math',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Include deleted courses',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value as boolean;
  })
  includeDeleted?: boolean = false;
}

export enum CourseSortField {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Title = 'title',
  Status = 'status',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class SortCourseDto {
  @ApiPropertyOptional({
    description: 'Sort field',
    enum: CourseSortField,
    default: CourseSortField.CreatedAt,
  })
  @IsOptional()
  @IsEnum(CourseSortField)
  field?: CourseSortField = CourseSortField.CreatedAt;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SortOrder,
    default: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder = SortOrder.DESC;
}

export class QueryCourseDto {
  @ApiPropertyOptional({
    description: 'Page number',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({ type: FilterCourseDto })
  @IsOptional()
  @Type(() => FilterCourseDto)
  filter?: FilterCourseDto;

  @ApiPropertyOptional({ type: SortCourseDto })
  @IsOptional()
  @Type(() => SortCourseDto)
  sort?: SortCourseDto;
}
