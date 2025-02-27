import { Controller, Get, Patch, Param, Delete, UseGuards, Req, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ✅ API: Thống kê học viên
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('statistics')
  async getUserStatistics(@Req() req: RequestWithUser) {
    const userId = req.user.data.user_id;
    return this.userService.getUserStatistics(userId);
  }

  // ✅ API: Lấy danh sách người dùng
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  // ✅ API: Lấy thông tin người dùng theo ID
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  // ✅ API: Cập nhật thông tin người dùng
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() userData: Partial<any>) {
    return this.userService.updateUser(Number(id), userData);
  }

  // ✅ API: Xóa người dùng
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }

  // ✅ API: Lấy danh sách học viên
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('students')
  async getStudents() {
    return this.userService.getStudents();
  }
}
