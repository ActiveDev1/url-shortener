import { EntityRepository, Repository } from 'typeorm'
import { CreateShortUrlDto } from './dtos/create-url.dto'
import { Url } from './url.entity'

@EntityRepository(Url)
export class UrlRepository extends Repository<Url> {
	async createUrl(createShortUrlDto: CreateShortUrlDto, userId: number, slug: string) {
		const url = this.create({ ...createShortUrlDto, userId, slug })
		await url.save()
	}

	async findOneBySlug(slug: string) {
		return await this.findOne({ slug })
	}

	async findAllByUserId(userId: number) {
		return await this.find({ userId })
	}
}
