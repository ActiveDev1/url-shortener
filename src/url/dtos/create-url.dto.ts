import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateShortUrlDto {
	@IsString()
	@Length(1, 60)
	title: string

	@IsString()
	@IsNotEmpty()
	url: string
}
