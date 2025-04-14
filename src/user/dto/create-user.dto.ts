import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { users_role, users_status } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'newuser01' })
  @IsString()
  user_name: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Nguyen Van A', required: false })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiProperty({ example: 'newuser01@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '0123456789', required: false })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ enum: users_role, example: 'student', required: false })
  @IsOptional()
  @IsEnum(users_role)
  role?: users_role;

  @ApiProperty({ enum: users_status, example: 'active', required: false })
  @IsOptional()
  @IsEnum(users_status)
  status?: users_status;
}
