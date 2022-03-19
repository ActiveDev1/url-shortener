import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateShortUrlDto } from './dtos/create-url.dto'
import { UrlRepository } from './url.repository'
import * as nanoid from '../utils/idGenerator'

@Injectable()
export class UrlService {
	constructor(
		@InjectRepository(UrlRepository)
		private urlRepository: UrlRepository
	) {}

	async createShortUrl(createShortUrlDto: CreateShortUrlDto, userId: number) {
		return await this.urlRepository.createUrl(createShortUrlDto, userId, nanoid.getID())
	}

	async getShortLink(slug: string) {
		const url = await this.urlRepository.findOneBySlug(slug)
		if (!url) {
			throw new NotFoundException('Url not found')
		}
		return url.url
	}
	async getUserUrls(userId: number) {
		return await this.urlRepository.findAllByUserId(userId)
	}
}
