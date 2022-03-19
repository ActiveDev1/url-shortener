import { IsNotEmpty, IsString } from 'class-validator'

export class GetSlugDto {
	@IsString()
	@IsNotEmpty()
	slug: string
}
