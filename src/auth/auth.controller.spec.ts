import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { CreateUserDto } from './dtos/create-user.dto'

describe('AuthController', () => {
	let authController: AuthController
	let spyService: AuthService
	const mockAuthService = {
		signup: jest.fn((dto) => Promise.resolve()),
		signin: jest.fn((dto) => Promise.resolve({ accessToken: 'asdas' }))
	}

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService]
		})
			.overrideProvider(AuthService)
			.useValue(mockAuthService)
			.compile()

		authController = module.get(AuthController)
		spyService = module.get(AuthService)
	})

	it('Calling signup method', () => {
		const dto = new CreateUserDto()
		authController.signup(dto)
		expect(spyService.signup).toHaveBeenCalledWith(dto)
	})

	it('Calling signin method', async () => {
		const dto = new CreateUserDto()
		await authController.signin(dto)
		expect(spyService.signin).toHaveBeenCalledWith(dto)
	})
})
