import { JwtModule } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { UserRepository } from './user.repository'
import { AuthService } from './auth.service'
import { jwtConfig } from '../config'
import { User } from './user.entity'
import { CreateUserDto } from './dtos/create-user.dto'
import { UnauthorizedException } from '@nestjs/common'

const users: User[] = []

const mockAuthService = {
	signup: jest.fn(() => Promise.resolve()),
	signin: jest.fn(() => Promise.resolve({ accessToken: 'asdas' }))
}

const mockUserRepository: Partial<UserRepository> = {
	signup: jest.fn((username: string, password: string) => {
		const user = {
			id: Math.floor(Math.random() * 999999),
			username,
			password,
			created_at: new Date(),
			updated_at: new Date()
		} as User
		users.push(user)
		return Promise.resolve()
	}),
	findOneByUsername: jest.fn((username: string) => {
		const user = users.find((user) => user.username === username)
		return Promise.resolve(user)
	})
}

describe('AuthService', () => {
	let authService: AuthService

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			imports: [JwtModule.register(jwtConfig)],
			providers: [
				AuthService,
				{
					provide: UserRepository,
					useValue: mockUserRepository
				}
			]
		})
			.overrideProvider(AuthService)
			.useValue(mockAuthService)
			.compile()

		authService = await module.get(AuthService)
	})

	describe('signup()', () => {
		it('Should call signup method', async () => {
			const dto: CreateUserDto = { username: 'test', password: 'test' }

			await authService.signup(dto)
			expect(authService.signup).toHaveBeenCalledWith(dto)

			await mockUserRepository.signup(dto.username, dto.password)
			expect(mockUserRepository.signup).toHaveBeenCalledWith(dto.username, dto.password)
		})
	})

	describe('signin()', () => {
		it('Should call signin method', async () => {
			const dto: CreateUserDto = { username: 'test', password: 'test' }

			await authService.signin(dto)
			expect(authService.signin).toHaveBeenCalledWith(dto)

			await mockUserRepository.findOneByUsername(dto.username)
			expect(mockUserRepository.findOneByUsername).toHaveBeenCalledWith(dto.username)

			expect(await mockAuthService.signin()).toEqual({ accessToken: expect.any(String) })
		})

		it('Throw if an invalid password is provided', async () => {
			try {
				const dto: CreateUserDto = { username: 'test', password: 'test1' }
				const user = await mockUserRepository.findOneByUsername(dto.username)
				expect(mockUserRepository.findOneByUsername).toHaveBeenCalledWith(dto.username)

				user.validateUserPassword = jest.fn(() => Promise.resolve(false))

				await user.validateUserPassword(dto.password)

				expect(user.validateUserPassword).toHaveBeenCalledWith(dto.password)
				expect(user.validateUserPassword(dto.password)).resolves.toBeFalsy()
			} catch (error) {
				expect(error).toBeInstanceOf(UnauthorizedException)
			}
		})

		it('Throw if user not found', async () => {
			try {
				const dto: CreateUserDto = { username: 'test1', password: 'test' }
				const user = await mockUserRepository.findOneByUsername(dto.username)
				expect(mockUserRepository.findOneByUsername).toHaveBeenCalledWith(dto.username)

				expect(user).toBeUndefined()
			} catch (error) {
				expect(error).toBeInstanceOf(UnauthorizedException)
			}
		})
	})
})
