import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dtos/create-user.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	async signup(@Body() createUserDto: CreateUserDto): Promise<void> {
		return await this.authService.signup(createUserDto)
	}

	@Post('signin')
	async signin(@Body() createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
		return await this.authService.signin(createUserDto)
	}
}
