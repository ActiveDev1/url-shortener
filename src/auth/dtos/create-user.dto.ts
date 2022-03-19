import { IsString, IsNotEmpty, Length } from 'class-validator'

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@Length(3, 20)
	username: string

	@IsString()
	@IsNotEmpty()
	@Length(6, 30)
	password: string
}
