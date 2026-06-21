import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';

@ApiTags('Аутентификация')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Вход в систему',
    description: 'Аутентификация пользователя и получение JWT-токена',
  })
  @ApiResponse({ status: 201, description: 'Успешная аутентификация' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Текущий пользователь',
    description:
      'Получить информацию о текущем аутентифицированном пользователе',
  })
  @ApiResponse({ status: 200, description: 'Информация о пользователе' })
  async me(@CurrentUser() user: { id: number }) {
    return this.authService.getMe(user.id);
  }
}
