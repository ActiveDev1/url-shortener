import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './auth.repository'
import { CreateUserDto } from './dtos/create-user.dto'
import { JwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private jwtService: JwtService
	) {}

	async signup(createUserDto: CreateUserDto): Promise<void> {
		return await this.userRepository.signup(createUserDto.username, createUserDto.password)
	}

	async signin(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
		const user = await this.userRepository.findOneByUsername(createUserDto.username)

		if (!user || !(await user.validateUserPassword(createUserDto.password))) {
			throw new UnauthorizedException('Wrong username or password')
		}

		const payload: JwtPayload = { username: user.username }
		const accessToken = this.jwtService.sign(payload)
		return { accessToken }
	}
}
